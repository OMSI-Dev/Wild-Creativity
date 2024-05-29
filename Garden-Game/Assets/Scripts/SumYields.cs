using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class SumYields : MonoBehaviour
{
    public TextMeshProUGUI YieldText;
    
    public int YieldTotal = 0;

    public float scrollRate = 0.1f;
    private bool isScrolling = false;
    public GameObject starGrid;
    private StarSpawner mStarSpawner;

    public float superDelay = 0.5f;

    // Start is called before the first frame update
    void Start()
    {
        mStarSpawner = starGrid.GetComponent<StarSpawner>();
    }

    public void StartScroll()
    {
        StartCoroutine(ScrollYield());
    }

    IEnumerator ScrollYield()
    {
        isScrolling = true;

        mStarSpawner.ClearStars();

        for(int CurrentValue = 0; CurrentValue <= YieldTotal; CurrentValue++)
        {
            if(CurrentValue % 13 == 0 || CurrentValue == 50)
            {
                mStarSpawner.AddStar();
            }

            YieldText.text = CurrentValue.ToString();
            yield return new WaitForSeconds(scrollRate);
        }

        isScrolling = false;

        if( YieldTotal >= 50 )
        {
            yield return new WaitForSeconds(superDelay);
            AudioManager.Instance.Play("SuperGardener");
            GameManager.Instance.SuperGardenerPopUp.SetActive(true);
        }    
    }

    int CalculateYieldTotal()
    {
        int yield = 0;

        foreach (GameObject plot in GameManager.Instance.plotObjects)
        {
            // TODO: Cache script objects?
            int y = plot.GetComponent<ChangePlot>().CurrentYield;
            yield += y;
        }

        return yield;
    }

    // Update is called once per frame
    void Update()
    {
        YieldTotal = CalculateYieldTotal();

        if (!isScrolling)
        {
            YieldText.text = YieldTotal.ToString();
        }
    }
}
