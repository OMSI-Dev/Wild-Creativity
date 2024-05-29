using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public enum Crop { Empty, Corn, Lettuce, Beans, Carrots, Squash, Flower, Size };

public enum GameStage {  Planting, Results }

public class GameManager : MonoBehaviour
{
    public static GameManager Instance;
    private void Awake()
    {
        if(Instance != null)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        //DontDestroyOnLoad(gameObject);
    }

    public GameObject YieldBox;

    public GameObject[] plotObjects;

    public int SelectedPlot;

    public bool bUseNewNeighbors = true;

    public bool bShowImmediateYield;
    public bool bDebugYield;

    public bool bClearCropsOnStart;

    public GameStage CurGameStage = GameStage.Planting;


    // Individual Yield Thresholds
    public int midMin = 2;
    public int strongMin = 4;

    // Rule Effects
    public int sunAffinity = 1;
    public int proxPenalty = 1;
    public int flowerBuff = 1;

    // Total Yield Thresholds (used for stars)

    // DEBUG RULES
    public int baseYield = 2;
    // One value for each member of Crop enum
    public int[] baseYields = new int[(int)Crop.Size];
    public bool showRulesIcons = false;


    public bool bPresetCrops;

    //public bool pulsePlaying = true;
    public Animator pulseAnimator;

    public GameObject SuperGardenerPopUp;

    // Interactables
    public Button LanguageButton;
    public Button GrowButton;
    public Button ClearButton;

    public void SetInteractables(bool setBool)
    {
        LanguageButton.interactable = setBool;
        GrowButton.interactable = setBool;
        ClearButton.interactable = setBool;

        foreach (GameObject plot in plotObjects)
        {
            //plot.GetComponent<Button>().interactable = setBool;
            plot.GetComponentInChildren<Button>().interactable = setBool;
        }
        //Debug.Log("Interactable Buttons turned: " + setBool);
    }

    // Start is called before the first frame update
    void Start()
    {
        baseYields[(int)Crop.Empty] = 0;
        baseYields[(int)Crop.Beans] = 1;
        baseYields[(int)Crop.Carrots] = 3;
        baseYields[(int)Crop.Corn] = 2;
        baseYields[(int)Crop.Flower] = 0;
        baseYields[(int)Crop.Lettuce] = 3;
        baseYields[(int)Crop.Squash] = 2;

        SelectedPlot = -1;

        //ShowImmediateYield(bShowImmediateYield);

        if(bClearCropsOnStart)
        {
            ClearGrid();
        }

        if(bPresetCrops)
        {
            for(int i = 0; i < plotObjects.Length; i++)
            {
                plotObjects[i].GetComponent<ChangePlot>().SetCrop(Crop.Lettuce);
            }
        }
    }

    public void SetShowRulesIcons(bool value)
    {
        showRulesIcons = value;
    }

    public void SetBaseYield(float value)
    {
        baseYield = (int)value;
    }

    public void SetMidMin(float value)
    {
        midMin = (int)value;
    }

    public void SetStrongMin(float value)
    {
        strongMin = (int)value;
    }

    public void SetSunAffinity(float value)
    {
        sunAffinity = (int)value;
    }
    public void SetProximityPenalty(float value)
    {
        proxPenalty = (int)value;
    }
    public void SetFlowerBuff(float value)
    {
        flowerBuff = (int)value;
    }
    public void SetBeanYield(float value)
    {
        baseYields[(int)Crop.Beans] = (int)value;
    }
    public void SetCarrotYield(float value)
    {
        baseYields[(int)Crop.Carrots] = (int)value;
    }

    public void SetCornYield(float value)
    {
        baseYields[(int)Crop.Corn] = (int)value;
    }

    public void SetLettuceYield(float value)
    {
        baseYields[(int)Crop.Lettuce] = (int)value;
    }

    public void SetSquashYield(float value)
    {
        baseYields[(int)Crop.Squash] = (int)value;
    }

    public void SetSelectedPlotIndex(int plotIndex)
    {
        SelectedPlot = plotIndex;
    }

    public void SetSelectedPlotCropByIndex(int newCrop)
    {
        plotObjects[SelectedPlot].GetComponent<ChangePlot>().SetCrop((Crop) newCrop);
    }

    public void SetSelectedPlotCrop(Crop newCrop)
    {
        plotObjects[SelectedPlot].GetComponent<ChangePlot>().SetCrop(newCrop);
    }

    public Crop GetCropAtPlotIndex(int index)
    {
        return plotObjects[index].GetComponent<ChangePlot>().GetCrop();
    }

    public Crop GetCropAtSelectedPlot()
    {
        return GetCropAtPlotIndex(SelectedPlot);
    }

    public void ClearGrid()
    {
        foreach(GameObject plot in plotObjects)
        {
            ChangePlot mPlotScript = plot.GetComponent<ChangePlot>();
            mPlotScript.SetCrop(Crop.Empty);
        }
    }

    public void GoToResultsStage()
    {
        bShowImmediateYield = true;

        pulseAnimator.SetTrigger("EndPulse");

        CurGameStage = GameStage.Results;

        foreach (GameObject plot in plotObjects)
        {
            plot.GetComponentInChildren<Button>().interactable = false;
        }
    }


    public void GoFromTransition()
    {
        YieldBox.GetComponent<SumYields>().StartScroll();
    }

    public void GoToPlantingStage()
    {
        SuperGardenerPopUp.SetActive(false);

        if (!bDebugYield) bShowImmediateYield = false;

        CurGameStage = GameStage.Planting;

        foreach(GameObject plot in plotObjects)
        {
            plot.GetComponentInChildren<Button>().interactable = true;
        }
    }

    public void SetDebugYield(bool isDebug)
    {
        bDebugYield = isDebug;

        if(CurGameStage == GameStage.Planting)
        {
            bShowImmediateYield = isDebug;
        }
    }
    
    // In our grid, two indices are on the same row if equally integer divisible
    private bool SameRow(int a, int b) 
    {
        //return (a / 4 == b / 4) ? true : false;
        if ( a >=0 && b >= 0 && a/4 == b/4)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    // Returns array of indices next to indicated plot
    public List<int> GetNeighborList(int plotIndex)
    {
        List<int> neighborList = new List<int>();

        // Calculate Neighbors
        int up = plotIndex - 4;
        int down = plotIndex + 4;
        int left = plotIndex - 1;
        int right = plotIndex + 1;

        // Range check
        if(up >= 0)
        {
            neighborList.Add(up);
        }
        if(down <= 15)
        {
            neighborList.Add(down);
        }
        if(left >= 0 && SameRow(left, plotIndex))
        {
            neighborList.Add(left);
        }
        if(right <= 15 && SameRow(right, plotIndex))
        {
            neighborList.Add(right);
        }

        return neighborList;
    }

    
    public List<int> GetNeighborDiagonalList(int plotIndex)
    {
        List<int> neighborList = new List<int>();

        int index = plotIndex;
        int colStart = -1;
        int colEnd = 1;

        // Check cur index row left and right
        if(SameRow(index, index - 1)) // Left
        {
            neighborList.Add(index - 1);
        }
        else
        {
            colStart = 0;
        }    

        if(SameRow(index, index + 1)) // Right
        {
            neighborList.Add(index + 1);
        }
        else
        {
            colEnd = 0;
        }

        // Check Above row
        int aboveIndex = index - 4;
        if(aboveIndex >= 0 && !SameRow(index, aboveIndex))
        {
            if(colStart != 0)
            {
                neighborList.Add(aboveIndex + colStart);
            }
            neighborList.Add(aboveIndex);
            if (colEnd != 0)
            {
                neighborList.Add(aboveIndex + colEnd);
            }
        }

        // Check Below Row
        int belowIndex = index + 4;
        if(belowIndex < 16 && !SameRow(index, belowIndex))
        {
            if(colStart != 0)
            {
                neighborList.Add(belowIndex + colStart);
            }
            neighborList.Add(belowIndex);
            if (colEnd != 0)
            {
                neighborList.Add(belowIndex + colEnd);
            }
        }

        return neighborList;
    }

    public List<GameObject> GetNeighborObjects(int plotIndex)
    {
        List <GameObject> neighborObjects = new List<GameObject>();

        List<int> neighborIndices = GetNeighborList(plotIndex);
        foreach(int nIndex in neighborIndices)
        {
            neighborObjects.Add(plotObjects[nIndex]);
        }

        return neighborObjects;
    }
}
