using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class PlantingSelection : MonoBehaviour
{

    public Crop SelectedCrop = Crop.Empty;
    private int SelectedCropIndex;
    public int CurrentButtonIndex;

    public GameObject[] PlantChoices;

    // Focus flow set up
    public enum MenuState { Empty, Focus};
    public bool InFocus = false;
    public GameObject FocusBox;
    public GameObject FocusTitle;
    public GameObject FocusDescription;
    public Image FocusImage;
    Animator animator;

    public float doubleTapTime = 1.2f;
    public int tapTimes = 0;
    private Button FocusButton;
    public Button PlantButton;

    private void Start()
    {
        animator = gameObject.GetComponent<Animator>();
        FocusButton = FocusBox.GetComponent<Button>();
        FocusButton.onClick.AddListener(FocusOnClicked);
    }

    IEnumerator ResetTapTimes()
    {
        yield return new WaitForSeconds(doubleTapTime);
        tapTimes = 0;
    }

    private void FocusOnClicked()
    {
        StartCoroutine("ResetTapTimes");
        tapTimes++;

        if (tapTimes >= 2) // DoubleTapped!
        {
            PlantButton.onClick.Invoke();
        }
    }

    private void UpdateFocus(int crop)
    {
        int cropIndex = crop - 1;
        GameObject Title = PlantChoices[cropIndex].transform.GetChild(1).gameObject; // UGLYYY
        GameObject Icon = PlantChoices[cropIndex].transform.GetChild(2).gameObject; // UGLYYY
        GameObject Description = PlantChoices[cropIndex].transform.GetChild(3).gameObject; // UGLYYY

        FocusTitle.GetComponent<TextMeshProUGUI>().text = Title.GetComponent<TextMeshProUGUI>().text;
        FocusDescription.GetComponent<TextMeshProUGUI>().text = Description.GetComponent<TextMeshProUGUI>().text;
        FocusImage.sprite = Icon.GetComponent<Image>().sprite;
    }

    public void SetFocusFlowBoolTrigger(bool inFlow)
    {
        if(animator != null)
        {
            animator.SetBool("InFocusFlow", inFlow);
        }
    }

    public void SetSelectedCropByIndex(int crop)
    {
        SelectedCrop = (Crop)crop;

        if (crop != (int)Crop.Empty)
        {
            ClearHighlight(); // Turn it off for the previous selection
            
            if(!InFocus)
            {
                animator.SetTrigger("ToFocus");
                InFocus = true;
            }
            

            int newButtonIndex = Mathf.Max(0, crop - 1);
            // Turn on the highlight box for the selected item in the grid
            PlantChoices[newButtonIndex].GetComponent<PlantingHighlighter>().SetHighlight(true);

            // Update Status
            CurrentButtonIndex = newButtonIndex;

            UpdateFocus((int)SelectedCrop);
        }

        //if (crop == (int)Crop.Beans || crop == (int)Crop.Squash || crop == (int)Crop.Corn)
        //{
        //    ThreeSistersCheckbox.isOn = true;
        //}
        //else
        //{
        //    ThreeSistersCheckbox.isOn = false;
        //}
    }

    public void Plant()
    {
        GameManager.Instance.SetSelectedPlotCrop(SelectedCrop);
    }

    public void OnOpen()
    {
        ClearHighlight();

        SetCropInteractables(true);

        GameManager.Instance.SetInteractables(false);

        SelectedCrop = GameManager.Instance.GetCropAtSelectedPlot();
        if (SelectedCrop != Crop.Empty)
        {
            CurrentButtonIndex = (int)SelectedCrop - 1;
            PlantChoices[CurrentButtonIndex].GetComponent<PlantingHighlighter>().SetHighlight(true);
            UpdateFocus((int)SelectedCrop);

            if (!InFocus)
            {
                animator.SetTrigger("ToFocus");
                InFocus = true;
            }
        }
        else
        {
            if(InFocus)
            {
                animator.SetTrigger("ClearFocus");
                animator.ResetTrigger("ToFocus");
                InFocus = false;
            }
        }

        //if (SelectedCrop == Crop.Beans || SelectedCrop == Crop.Squash || SelectedCrop == Crop.Corn)
        //{
        //    ThreeSistersCheckbox.isOn = true;
        //}
        //else
        //{
        //    ThreeSistersCheckbox.isOn = false;
        //}

        animator.SetTrigger("Open");
    }

    private void SetCropInteractables(bool setbool)
    {
        foreach(GameObject choiceBox in PlantChoices)
        {
            choiceBox.GetComponent<Button>().interactable = setbool;
        }

        FocusButton.interactable = setbool;
    }

    public void OnClose()
    {
        SetCropInteractables(false);

        animator.SetTrigger("Close");
        animator.ResetTrigger("ToFocus");
        GameManager.Instance.SetInteractables(true);

        
    }

    private void ClearHighlight()
    {
        if (CurrentButtonIndex >= 0 && CurrentButtonIndex < PlantChoices.Length)
        {
            PlantChoices[CurrentButtonIndex].GetComponent<PlantingHighlighter>().SetHighlight(false);
        }
    }
}
