using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TransitionPop : MonoBehaviour
{
    public float waitInSecs = 5f;

    public GameObject ResultsBar;
    public GameObject PlantingBar;
    public GameObject YieldBox;
    public GameObject gameManager;
    public GameObject popup;

    public float waitForResultSound = 1.5f;

    public void StartTransition()
    {
        popup.SetActive(true);
        StartCoroutine(MakeTransition());
    }

    IEnumerator MakeTransition()
    {

        yield return new WaitForSeconds(waitInSecs);

        ResultsBar.SetActive(true);
        PlantingBar.SetActive(false);

        popup.SetActive(false);

        yield return new WaitForSeconds(0.1f);

        YieldBox.GetComponent<SumYields>().StartScroll();

        yield return new WaitForSeconds(waitForResultSound);
        //AudioManager.Instance.Play("Results");
    }
}
