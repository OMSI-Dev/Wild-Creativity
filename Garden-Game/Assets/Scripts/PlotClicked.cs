using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlotClicked : MonoBehaviour
{

    private Button plotButton;
    public Animator pulseAnimator;
    public GameObject ChooseCropPopup;
    private PlantingSelection plantingSelection;

    public int plotIndex;

    void Start()
    {
        plotButton = gameObject.GetComponent<Button>();
        plotButton.onClick.AddListener(TaskOnClick);

        plantingSelection = ChooseCropPopup.GetComponent<PlantingSelection>();
    }

    void TaskOnClick()
    {
        pulseAnimator.SetTrigger("EndPulse");

        GameManager.Instance.SetSelectedPlotIndex(plotIndex);
        plantingSelection.OnOpen();

        AudioManager.Instance.Play("Plant");
    }
}
