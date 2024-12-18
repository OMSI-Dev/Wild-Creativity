#include "AudioOut.h"

AudioOut::AudioOut () {

}
void AudioOut::begin () {
    // start wavTrigger
    wTrig.start();
    wTrig.stopAllTracks();
    //wTrig.samplerateOffset(0);
    wTrig.setReporting(true);

}
void AudioOut::update() {
    wTrig.update();
}
void AudioOut::playTrackSolo(int trackNum) {
    wTrig.trackPlaySolo(trackNum);
}
void AudioOut::playTrack(int trackNum) {
    wTrig.trackPlayPoly(trackNum);
}
void AudioOut::stopAllTracks() {
    wTrig.stopAllTracks();
}

void AudioOut::stopTrack(int trackNum){
    wTrig.trackStop(trackNum);
}

void AudioOut::loop(int trackNum, bool enable){
    wTrig.trackLoop(trackNum,enable);
}