using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class SliderUpdate : MonoBehaviour
{
    private TextMeshProUGUI SliderText;
    public void SetSliderText(float value)
    {
        int iValue = (int)value;
        SliderText.text = iValue.ToString();
    }

    // Start is called before the first frame update
    void Start()
    {
        SliderText = gameObject.GetComponent<TextMeshProUGUI>();
    }

}
