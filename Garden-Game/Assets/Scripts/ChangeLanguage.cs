using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Localization.Settings;
using UnityEngine.UI;
using TMPro;

public class ChangeLanguage : MonoBehaviour
{
    public static ChangeLanguage Instance { get; private set; }

    private bool bInEnglish = true;
    public Image buttonImage;  // assign this from Inspector
    public TextMeshProUGUI buttonText;  // assign this from Inspector

    private enum Language { English = 0, Spanish = 1 }
    private Color englishGreen = new Color(0.047f, 0.29f, 0.25f);
    private Color spanishBlue = new Color(0.223f, 0.396f, 0.686f);

    private void Awake()
    {
        Debug.Log("awake ran");
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }


    public void SwitchLanguage()
    {
        if (bInEnglish)
        {
            bInEnglish = false;
            PlayerPrefs.SetString("language", "Spanish");
        }
        else
        {
            bInEnglish = true;
            PlayerPrefs.SetString("language", "English");
        }
        PlayerPrefs.Save();
        SwitchLocale();
        UpdateButtonAppearance();
    }


    private void SwitchLocale()
    {
        if (bInEnglish)
        {
            LocalizationSettings.SelectedLocale = LocalizationSettings.AvailableLocales.Locales[(int)Language.English];
        }
        else
        {
            LocalizationSettings.SelectedLocale = LocalizationSettings.AvailableLocales.Locales[(int)Language.Spanish];
        }
    }

    private void UpdateButtonAppearance()
    {
        if (bInEnglish)
        {
            buttonText.text = "Español";
            buttonImage.color = spanishBlue;
        }
        else
        {
            buttonText.text = "English";
            buttonImage.color = englishGreen;
        }
    }

    IEnumerator Start()
    {
        yield return LocalizationSettings.InitializationOperation;

        string language = PlayerPrefs.GetString("language", "English");

        if (language == "English")
        {
            bInEnglish = true;
        }
        else if (language == "Spanish")
        {
            bInEnglish = false;
        }
        else
        {
            // Default case
            bInEnglish = true;
        }
        SwitchLocale();
        UpdateButtonAppearance();
    }

    public void ApplySavedLanguage()
    {
        string language = PlayerPrefs.GetString("language", "English");

        if (language == "English")
        {
            bInEnglish = true;
        }
        else if (language == "Spanish")
        {
            bInEnglish = false;
        }
        SwitchLocale();
        UpdateButtonAppearance();
    }


}
