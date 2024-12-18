#ifndef AUDIOOUT_H
#define AUDIOOUT_H

#include "audio/wavTrigger.h"

#define AUDIO_TX 
#define AUDIO_RX

class AudioOut {
    public:
        AudioOut();
        void begin();
        void update();
        void playTrack(int trackNum);
        void playTrackSolo(int trackNum);
        void stopAllTracks();
        void stopTrack(int trackNum);
        void loop(int trackNum, bool enable);
    private:
        wavTrigger wTrig;

};

#endif