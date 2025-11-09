"use client";
import React, { useEffect, useRef } from "react";
/*
1. Create a context for every element in the matrix/timeline
2. Each context has its own gain node
3. The setVolume function takes an additional parameter to identify which context's gain node to adjust
*/
export function initializeTimelineAudioNodes() : any[][] {
    const timelineRef = useRef<any[][]>(Array.from({ length: 2 }, () => new Array(32).fill(0)));
    const timeline = timelineRef.current;

    for (let i = 0; i < timeline.length; i++) {
        for (let j = 0; j < timeline[i].length; j++) {
        // create a context for each node
        const audioContext = new window.AudioContext();
        const gainNode = audioContext.createGain(); // volume
        const pannerNode = audioContext.createStereoPanner(); // pan
        //const reverbNode = audioContext.createConvolver(); // reverb
        const delayNode = audioContext.createDelay(); // delay
        const filterNode = audioContext.createBiquadFilter(); // filter
        const pitchNode = audioContext.createWaveShaper(); // pitch
        const speedNode = audioContext.createBufferSource(); // speed
        
        // connect nodes
        pannerNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        //reverbNode.connect(audioContext.destination);
        delayNode.connect(audioContext.destination);
        filterNode.connect(audioContext.destination);
        pitchNode.connect(audioContext.destination);
        speedNode.connect(audioContext.destination);

        // store nodes in timeline
        timeline[i][j] = {
            audioContext,
            gainNode,
            pannerNode,
            //reverbNode,
            delayNode,
            filterNode,
            pitchNode,
            speedNode,
        };
    }
  }

  return timeline;
}

// update volume function for individual gain nodes
export function setVolume (volume: number, gainNode: GainNode) {
    gainNode.gain.value = volume;
    gainNode.connect(gainNode.context.destination);
}