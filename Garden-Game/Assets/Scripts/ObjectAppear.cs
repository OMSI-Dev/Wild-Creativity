using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectAppear : MonoBehaviour
{
    public GameObject Thing;
    public float DelayS;
    private void OnEnable()
    {
        if(Thing != null)
        {
            StartCoroutine(ShowThing(Thing, DelayS));
        }
    }
    IEnumerator ShowThing(GameObject thing, float delay)
    {
        thing.SetActive(false);
        yield return new WaitForSeconds(delay);
        thing.SetActive(true);
    }
}
