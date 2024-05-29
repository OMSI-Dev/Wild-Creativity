using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlantingHighlighter : MonoBehaviour
{
    public GameObject HighlightBox;
    public Button PlantButton;

    private Button cropButton;
    public float doubleTapTime = 1.2f;
    public int tapTimes = 0;
    void Start()
    {
        cropButton = GetComponent<Button>();
        cropButton.onClick.AddListener(OnButtonClicked);
    }
    IEnumerator ResetTapTimes()
    {
        yield return new WaitForSeconds(doubleTapTime);
        tapTimes = 0;
    }
    void OnButtonClicked()
    {
        StartCoroutine("ResetTapTimes");
        tapTimes++;

        if(tapTimes >= 2) // DoubleTapped!
        {
            PlantButton.onClick.Invoke();
        }
    }
    public void SetHighlight(bool HilightMe)
    {
        HighlightBox.SetActive(HilightMe);
    }
}
