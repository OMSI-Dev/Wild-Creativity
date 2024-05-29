using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public enum PlantStage { Planting, Weak, Mid, Strong, Harvest, Size}

public class PlotIconPicker : MonoBehaviour
{
    public Image plotImage;
    public Sprite defaultSprite;
    public Sprite[] beanSprites;
    public Sprite[] carrotSprites;
    public Sprite[] lettuceSprites;
    public Sprite[] cornSprites;
    public Sprite[] squashSprites;
    public Sprite[] flowerSprites;

    private ChangePlot mChangePlotScript;

    public GameObject YieldBubble;

    const int plantingIndex = 0;
    const int resultIndex = 1;

    // Start is called before the first frame update
    void Start()
    {
        mChangePlotScript = this.GetComponent<ChangePlot>();
    }

    // Update is called once per frame
    void Update()
    {
        if (GameManager.Instance.bShowImmediateYield == false)
        {
            YieldBubble.SetActive(false);
        }
        else
        {
            YieldBubble.SetActive(true);
        }

        if (Crop.Empty == mChangePlotScript.CurrentCrop)
        {
            plotImage.enabled = false;
        }
        else
        {
            plotImage.enabled = true;

            if(GameManager.Instance.CurGameStage == GameStage.Planting)
            {
                //this.GetComponentInChildren<Button>().interactable = true;

                Sprite nextSprite = defaultSprite;

                switch(mChangePlotScript.CurrentCrop)
                {
                    case Crop.Beans:
                        nextSprite = beanSprites[plantingIndex];
                        break;
                    case Crop.Carrots:
                        nextSprite = carrotSprites[plantingIndex];
                        break;
                    case Crop.Corn:
                        nextSprite = cornSprites[plantingIndex];
                        break;
                    case Crop.Flower:
                        nextSprite = flowerSprites[plantingIndex];
                        break;
                    case Crop.Lettuce:
                        nextSprite = lettuceSprites[plantingIndex];
                        break;
                    case Crop.Squash:
                        nextSprite = squashSprites[plantingIndex];
                        break;

                }

                plotImage.sprite = nextSprite;
            }
            else if (GameManager.Instance.CurGameStage == GameStage.Results)
            {

                int yield = mChangePlotScript.CurrentYield;

                int iconIndex = Mathf.Max(yield, resultIndex);

                //PlantStage growth = PlantStage.Weak;
                //if (yield >= GameManager.Instance.strongMin)
                //{ 
                //    growth = PlantStage.Strong;
                //}
                //else if (yield >= GameManager.Instance.midMin)
                //{
                //    growth = PlantStage.Mid;
                //}

                Sprite nextSprite = defaultSprite;

                switch (mChangePlotScript.CurrentCrop)
                {
                    case Crop.Beans:
                        iconIndex = Mathf.Min(iconIndex, beanSprites.Length - 1);
                        nextSprite = beanSprites[iconIndex];
                        break;
                    case Crop.Carrots:
                        iconIndex = Mathf.Min(iconIndex, carrotSprites.Length - 1);
                        nextSprite = carrotSprites[iconIndex];
                        break;
                    case Crop.Corn:
                        iconIndex = Mathf.Min(iconIndex, cornSprites.Length - 1);
                        nextSprite = cornSprites[iconIndex];
                        break;
                    case Crop.Flower:
                        iconIndex = Mathf.Min(iconIndex, flowerSprites.Length - 1);
                        nextSprite = flowerSprites[iconIndex];
                        break;
                    case Crop.Lettuce:
                        iconIndex = Mathf.Min(iconIndex, lettuceSprites.Length - 1);
                        nextSprite = lettuceSprites[iconIndex];
                        break;
                    case Crop.Squash:
                        iconIndex = Mathf.Min(iconIndex, squashSprites.Length - 1);
                        nextSprite = squashSprites[iconIndex];
                        break;

                }

                plotImage.sprite = nextSprite;

            }
        }
    }
}
