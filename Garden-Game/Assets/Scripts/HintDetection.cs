using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class HintDetection : MonoBehaviour
{
    public GameObject EmptyCropsHint;
    public GameObject MonocultureHint;
    public GameObject ThreeSistersHint;
    void OnEnable()
    {
        UpdateHint();
    }
    void UpdateHint()
    {
        ClearHint();

        int[] cropCounts = new int[(int)Crop.Size];
        int sistersCount = 0;

        foreach (GameObject Plot in GameManager.Instance.plotObjects)
        {
            ChangePlot mChangePlot = Plot.GetComponent<ChangePlot>();
            int cropIndex = (int)mChangePlot.CurrentCrop;
            if (cropIndex < 0 || cropIndex >= (int)Crop.Size)
            {
                Debug.Log("Yucky, out of range");
                return;
            }
            cropCounts[cropIndex]++;

            if (mChangePlot.isThreeSisters)
            {
                sistersCount++;
            }
        }

        // Check for too many empty crops
        if(cropCounts[(int) Crop.Empty] > 5)
        {
            EmptyCropsHint.SetActive(true);
            return;
        }

        // Check for too many of one crop (Start at 1 to disclude Crop.empty)
        for(int i = 1; i < (int) Crop.Size; i++)
        {
            if(cropCounts[i] > 8)
            {
                MonocultureHint.SetActive(true);
                return;
            }
        }

        // Check for too few three sisters
        if(sistersCount < 7)
        {
            ThreeSistersHint.SetActive(true);
            return;
        }

        //// Pollinator hint
        //if(cropCounts[(int) Crop.Flower] < 2)
        //{

        //}
}

    void ClearHint()
    {
        EmptyCropsHint.SetActive(false);
        MonocultureHint.SetActive(false);
        ThreeSistersHint.SetActive(false);
    }
}
