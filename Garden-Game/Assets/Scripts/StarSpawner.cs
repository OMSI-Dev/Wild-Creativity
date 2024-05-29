using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StarSpawner : MonoBehaviour
{
    public GameObject[] stars;

    private int numStars = 0;
    private int maxStars = 5;

    public void AddStar()
    {
        if(numStars < maxStars)
        {
            stars[numStars].SetActive(true);
            numStars++;

            AudioManager.Instance.Play("Results");
        }
    }
    public void ClearStars()
    {
        for (int i = 0; i < stars.Length; i++)
        {
            stars[i].SetActive(false);
        }

        numStars = 0;
    }
}
