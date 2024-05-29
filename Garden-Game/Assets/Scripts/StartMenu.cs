using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using TMPro;



public class StartMenu : MonoBehaviour
{
    public Animator transition;
    public float transitionTime = 1f;

    public static StartMenu Instance;

    public float idleTimeSetting = 15f;
    public float lastIdleTime;

    public bool inGame = false;

    void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
            return;
        }
        DontDestroyOnLoad(gameObject);

        if (SceneManager.GetActiveScene().buildIndex == 0)
        {
            inGame = false;
        }
        else
        {
            inGame = true;
        }
        lastIdleTime = Time.time;
    }

    public void StartGame()
    {

        StartCoroutine(LoadLevel(SceneManager.GetActiveScene().buildIndex + 1));

        inGame = true;
    }

    public void RestartGame()
    {
        StartCoroutine(LoadLevel(0));
        inGame = false;
    }


    IEnumerator LoadLevel(int levelIndex)
    {
        // Part 1: Trigger the transition and wait for it to complete
        transition.SetTrigger("Start");
        yield return new WaitForSeconds(transitionTime);
        SceneManager.LoadScene(levelIndex);

        // Part 2: Wait one frame for the new scene to initialize, then apply language settings
        yield return null; // This will wait for one frame

                           // Part 3: Find the button and text objects and assign them to the ChangeLanguage instance
        GameObject buttonObject = GameObject.Find("LanguageButton"); // replace "ButtonObjectName" with the name of your button object
        if (buttonObject != null)
        {
            ChangeLanguage.Instance.buttonImage = buttonObject.GetComponent<Image>();
            ChangeLanguage.Instance.buttonText = buttonObject.GetComponentInChildren<TextMeshProUGUI>();
        }

        // Part 4: Apply language settings
        ChangeLanguage.Instance.ApplySavedLanguage();

        lastIdleTime = Time.time;
    }


    public void ReloadScreen()
    {
        StartCoroutine(Reload());
    }

    IEnumerator Reload()
    {
        transition.SetTrigger("Reload");
        yield return new WaitForSeconds(transitionTime);
        transition.SetTrigger("Start");
    }

    private void Update()
    {
        if(inGame)
        {
            if(Input.anyKey)
            {
                lastIdleTime = Time.time;
            }
        
            if(IdleCheck())
            {
                RestartGame();
            }
        }

    }

    public bool IdleCheck()
    {
        return Time.time - lastIdleTime > idleTimeSetting;
    }
}
