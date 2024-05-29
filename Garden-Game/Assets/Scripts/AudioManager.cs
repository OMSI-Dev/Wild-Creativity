using System.Collections;
using System.Collections.Generic;
using System;
using UnityEngine;
using UnityEngine.Audio;

public class AudioManager : MonoBehaviour
{
    public static AudioManager Instance;

    public Sound[] sounds;
    private AudioSource localSource;

    void Awake()
    {
        if(Instance == null)
        {
            Instance = this;
            //DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }        

        //foreach (Sound s in sounds)
        //{
        //    s.source = gameObject.AddComponent<AudioSource>();
        //    s.source.clip = s.clip;
        //    s.source.loop = s.loop;
        //}
    }

    private void Start()
    {
        localSource = gameObject.GetComponent<AudioSource>();
    }

    public void Play(string soundName)
    {
        Sound s = Array.Find(sounds, item => item.name == soundName);
        if(s==null)
        {
            Debug.LogWarning("Sound not found: " + soundName);
            return;
        }

        localSource.volume = s.volume;
        localSource.pitch = s.pitch;

        localSource.PlayOneShot(s.clip);
    }
}
