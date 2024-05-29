using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ChangePlot : MonoBehaviour
{
    public bool isThreeSisters = false;
    public GameObject ThreeSistersCheckbox;

    public int PlotIndex;
    public GameObject HighlightBox;

    public bool IsShadePlot;

    public Crop CurrentCrop;

    public int CurrentYield;

    public GameObject LabelText;
    private TextMeshProUGUI mLabelText;

    public GameObject YieldText;
    private TextMeshProUGUI mYieldText;

    // Show Rule Icons
    public GameObject SunAffinityIcon;
    public GameObject SunAffinityText;
    public GameObject ProximityIcon;
    public GameObject ProximityText;
    public GameObject FlowerIcon;
    public GameObject FlowerText;

    // CALCULATE YIELDS
    public GameObject[] neighborPlots;
    public int[] neighborCrops;

    // Use Dict??
    private string[] plantStrings = new string[] { "Empty", "Corn", "Lettuce", "Beans",
                                                    "Carrots", "Squash", "Flower" };

    private void Awake()
    {
        mLabelText = LabelText.GetComponent<TextMeshProUGUI>();
        mYieldText = YieldText.GetComponent<TextMeshProUGUI>();
    }

    // Start is called before the first frame update
    void Start()
    {
        CurrentYield = 0;

        mLabelText.text = "empty";
        mYieldText.text = CurrentYield.ToString();

        SunAffinityIcon.SetActive(false);
        ProximityIcon.SetActive(false);
        ProximityText.SetActive(false);
        FlowerIcon.SetActive(false);

        ThreeSistersCheckbox.SetActive(false);
    }

    public void SetCrop(Crop newCrop)
    {
        // Hack around early null exception
        if (mLabelText == null) return;

        CurrentCrop = newCrop;
        int curCrop = (int)CurrentCrop;

        // Update Labels
        if (curCrop >= 0 && curCrop < plantStrings.Length)
        {
            mLabelText.text = plantStrings[curCrop];
        }

        isThreeSisters = false;
        ThreeSistersCheckbox.SetActive(false);
    }

    public Crop GetCrop()
    {
        return CurrentCrop;
    }

    private bool FlowerBuffCheck()
    {
        List<int> neighbors = GameManager.Instance.GetNeighborDiagonalList(PlotIndex);

        foreach( int index in neighbors)
        {
            if (index >= 0 && index <= 15)
            {
                Crop nCrop = GameManager.Instance.plotObjects[index].GetComponent<ChangePlot>().GetCrop();
                if (nCrop == Crop.Flower) return true;
            }
            else
            {
                Debug.Log("Index is loopy: " + index);
            }
        }

        return false;
    }

    private int[] GetNeighborCropType2()
    {
        neighborCrops = new int[(int)Crop.Size];
        List<int> neighbors = GameManager.Instance.GetNeighborList(PlotIndex);
        foreach (int index in neighbors)
        {
            if (index >= 0 && index <= 15)
            {
                Crop nCrop = GameManager.Instance.plotObjects[index].GetComponent<ChangePlot>().GetCrop();
                neighborCrops[(int)nCrop]++;
            }
            else
            {
                Debug.Log("Index is loopy: " + index);
            }
        }

        return neighborCrops;
    }

    private bool ThreeSistersCheck()
    {
        // Immediate Check
        List<Crop> sisters2 = new List<Crop> { Crop.Squash, Crop.Beans, Crop.Corn };
        if(sisters2.Contains(CurrentCrop))
        {
            sisters2.Remove(CurrentCrop);
            List<GameObject> neighbors3 = GameManager.Instance.GetNeighborObjects(PlotIndex);
            foreach (GameObject iPlot in neighbors3)
            {
                Crop secondCrop = iPlot.GetComponent<ChangePlot>().GetCrop();
                if (sisters2.Contains(secondCrop))
                {
                    sisters2.Remove(secondCrop);
                }
            }
        }
        if(sisters2.Count == 0)
        {
            ThreeSistersCheckbox.SetActive(true);
            return true;
        }


        // Distal Check
        List<Crop> sisters = new List<Crop> { Crop.Squash, Crop.Beans, Crop.Corn };

        if (sisters.Contains(CurrentCrop))
        {
            sisters.Remove(CurrentCrop);

            List<GameObject> neighbors1 = GameManager.Instance.GetNeighborObjects(PlotIndex);
            foreach(GameObject iPlot in neighbors1)
            {
                Crop secondCrop = iPlot.GetComponent<ChangePlot>().GetCrop();
                if (sisters.Contains(secondCrop))
                {
                    sisters.Remove(secondCrop);

                    int index2 = iPlot.GetComponent<ChangePlot>().PlotIndex;
                    List<GameObject> neighbors2 = GameManager.Instance.GetNeighborObjects(index2);
                    foreach(GameObject jPlot in neighbors2)
                    {
                        Crop thirdCrop = jPlot.GetComponent<ChangePlot>().GetCrop();
                        if (sisters.Contains(thirdCrop))
                        {
                            ThreeSistersCheckbox.SetActive(true);
                            return true;
                        }
                    }

                    sisters.Add(secondCrop);
                }
            }

        }

        ThreeSistersCheckbox.SetActive(false);
        return false;
    }

    private int CalculateYield()
    {

        SunAffinityIcon.SetActive(false);
        ProximityIcon.SetActive(false);
        FlowerIcon.SetActive(false);
        SunAffinityText.SetActive(false);
        ProximityText.SetActive(false);
        FlowerText.SetActive(false);
        
        // Empty plots & flowers don't yield
        if (CurrentCrop == Crop.Empty || CurrentCrop == Crop.Flower)
        {
            return 0;
        }

        // Base yield is 2
        //int yield = mGameManagerScript.baseYield;
        int yield = GameManager.Instance.baseYields[(int)CurrentCrop];

        // Shade/Sun Affinity
        if(!IsShadePlot)
        {
            // Corn, Beans, and Squash get a bump in the sun
            if(CurrentCrop == Crop.Corn || CurrentCrop == Crop.Beans || 
                CurrentCrop == Crop.Squash)
            {
                yield += GameManager.Instance.sunAffinity;

                if(GameManager.Instance.showRulesIcons)
                {
                    SunAffinityIcon.SetActive(true);
                    SunAffinityText.SetActive(true);
                    TextMeshProUGUI ptext = SunAffinityText.GetComponent<TextMeshProUGUI>();
                    ptext.text = "+" + GameManager.Instance.sunAffinity;
                }
            }
            else if (CurrentCrop == Crop.Lettuce || CurrentCrop == Crop.Carrots)
            {
                yield -= GameManager.Instance.sunAffinity;
                yield = Mathf.Max(0, yield);

                if (GameManager.Instance.showRulesIcons)
                {
                    SunAffinityIcon.SetActive(true);
                    SunAffinityText.SetActive(true);
                    TextMeshProUGUI ptext = SunAffinityText.GetComponent<TextMeshProUGUI>();
                    ptext.text = "-" + GameManager.Instance.sunAffinity;
                }
            }
        }

        // Neighbor Affinity
        if(GameManager.Instance.bUseNewNeighbors == true)
        {
            GetNeighborCropType2();
        }
        
        // All crops but carrot get -1 if next to more than 2 of themselves
        if(Crop.Carrots != CurrentCrop)
        {
            if(neighborCrops[(int) CurrentCrop] > 2)
            {
                yield -= GameManager.Instance.proxPenalty;
                yield = Mathf.Max(0, yield);

                if (GameManager.Instance.showRulesIcons)
                {
                    ProximityIcon.SetActive(true);
                    ProximityText.SetActive(true);
                    TextMeshProUGUI ptext = ProximityText.GetComponent<TextMeshProUGUI>();
                    ptext.text = "-" + GameManager.Instance.proxPenalty;
                }
            }
        }

        if (Crop.Carrots == CurrentCrop)
        {
            // +1 if in sun and next to squash
            if (!IsShadePlot && neighborCrops[(int)Crop.Squash] > 0)
            {
                yield += GameManager.Instance.sunAffinity;

                if (GameManager.Instance.showRulesIcons)
                {
                    SunAffinityIcon.SetActive(true);
                }
            }
        }
        else if (Crop.Corn == CurrentCrop)
        {
            // +1 for near squash if in the sun
            if (neighborCrops[(int)Crop.Squash] > 0 && !IsShadePlot)
            {
                int squashplus = 1 * neighborCrops[(int)Crop.Squash];
                squashplus = Mathf.Min(squashplus, 1); // Updated rules 9.26
                yield += squashplus;
            }
        }
        else if (Crop.Beans == CurrentCrop)
        {
            // +2 if adjacent to any corn
            if (neighborCrops[(int)Crop.Corn] > 0)
            {
                yield += 2;
            }
        }
        else if (Crop.Lettuce == CurrentCrop)
        {
            // -1 if any squash nearby
            if (neighborCrops[(int)Crop.Squash] > 0)
            {
                yield -= 1;
            }

            //// +2 if any flower nearby
            //if (neighborCrops[(int)Crop.Flower] > 0)
            //{
            //    int flowerbuff = GameManager.Instance.flowerBuff * neighborCrops[(int)Crop.Flower];
            //    flowerbuff = Mathf.Min(flowerbuff, 2);
            //    yield += flowerbuff;

            //    if (GameManager.Instance.showRulesIcons)
            //    {
            //        FlowerIcon.SetActive(true);
            //        FlowerText.SetActive(true);
            //        TextMeshProUGUI ptext = FlowerText.GetComponent<TextMeshProUGUI>();
            //        ptext.text = "+" + GameManager.Instance.flowerBuff;

            //    }
            //}
        }
        else if (Crop.Squash == CurrentCrop)
        {
            //// +1 for each adjacent flower, max 2 (flowers?)
            //if(neighborCrops[(int)Crop.Flower] > 0)
            //{
            //    int flowerplus = GameManager.Instance.flowerBuff * neighborCrops[(int)Crop.Flower];
            //    flowerplus = Mathf.Min(flowerplus, 2);
            //    yield += flowerplus;

            //    if (GameManager.Instance.showRulesIcons)
            //    {
            //        FlowerIcon.SetActive(true);
            //        FlowerText.SetActive(true);
            //        TextMeshProUGUI ptext = FlowerText.GetComponent<TextMeshProUGUI>();
            //        ptext.text = "+" + flowerplus;

            //    }
            //}
        }

        if(Crop.Squash == CurrentCrop || Crop.Lettuce == CurrentCrop)
        {
            // Flower bonus: +2 for any adjacent flower, including diagonal. No bonus for additional flowers, max 2
            if( FlowerBuffCheck())
            {
                yield += 2;
            }
        }

        // Three sisters Bonus
        // If I'm one of the three sisters and the other two are adjacent, add one
        if (ThreeSistersCheck())
        {
            isThreeSisters = true;
            yield++;
        }


        return yield;
    }

    // Update is called once per frame
    void Update()
    {
        // Calculate Yield
        CurrentYield = CalculateYield();

        mLabelText.text = plantStrings[(int)CurrentCrop];
        mYieldText.text = CurrentYield.ToString();

        if(GameManager.Instance.SelectedPlot == PlotIndex && 
            GameManager.Instance.CurGameStage == GameStage.Planting)
        {
            HighlightBox.SetActive(true);
        }
        else
        {
            HighlightBox.SetActive(false);
        }

    }
}
