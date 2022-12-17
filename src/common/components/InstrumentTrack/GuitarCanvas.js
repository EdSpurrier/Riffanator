import React, { useRef, useEffect, memo } from 'react'
import styled from 'styled-components';
import { theme } from '../../../theme';

const SytledCanvas = styled.canvas`

`

const GuitarCanvas = memo(({ props, instrumentData }) => {
  
  const canvasRef = useRef(null)


  const drawBackground = (ctx) => {
    ctx.fillStyle = theme.colors.instrumentTrack.guitar.background;
    ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  }

  const drawBarLines = (ctx) => {

    if (!instrumentData['meta']['setup']) {
      return;
    }

    let barWidth = (ctx.canvas.clientWidth) / instrumentData['style']['bars'].length;
    let currentBar = 0;
    instrumentData['style']['bars'].forEach(bar => {
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(currentBar * barWidth, 0);
      ctx.lineTo(currentBar * barWidth, ctx.canvas.clientHeight);
      ctx.stroke();
      currentBar++;
    });

  }

  const drawBeatLines = (ctx) => {

    if (!instrumentData['meta']['setup']) {
      return;
    }

    let beatWidth = (ctx.canvas.clientWidth) / (instrumentData['style']['bars'].length*4);
    let totalBeatCount = instrumentData['style']['bars'].length*4;
    let currentBeat = 0;

    for (let i = 0; i <= totalBeatCount; i++) {
      ctx.lineWidth = 0.25;
      ctx.beginPath();
      ctx.moveTo(currentBeat * beatWidth, 0);
      ctx.lineTo(currentBeat * beatWidth, ctx.canvas.clientHeight);
      ctx.stroke();
      currentBeat++;
    }

  }

  const drawNoteLines = (ctx) => {

    if (!instrumentData['meta']['setup']) {
      return;
    }

    let noteWidth = (ctx.canvas.clientWidth) / (instrumentData['style']['bars'].length*32);
    let totalNoteCount = instrumentData['style']['bars'].length*32;
    let currentNote = 0;

    for (let i = 0; i <= totalNoteCount; i++) {
      ctx.lineWidth = 0.25;
      ctx.beginPath();
      ctx.moveTo(currentNote * noteWidth, 0);
      ctx.lineTo(currentNote * noteWidth, ctx.canvas.clientHeight);
      ctx.stroke();
      currentNote++;
    }

  }
  
  const drawStringLines = (ctx) => {

    if (!instrumentData['meta']['setup']) {
      return;
    }

    let stringHeight = (ctx.canvas.clientHeight) / (instrumentData['strings'].length);
    let totalStringCount = instrumentData['strings'].length;
    let currentString = 0;

    for (let i = 0; i < totalStringCount; i++) {
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, (currentString * stringHeight));
      ctx.lineTo(ctx.canvas.clientWidth, (currentString * stringHeight));
      ctx.stroke();
      currentString++;
    }

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(ctx.canvas.clientWidth, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.clientHeight-2);
    ctx.lineTo(ctx.canvas.clientWidth, ctx.canvas.clientHeight-2);
    ctx.stroke();
  }


  const draw = (ctx, frameCount) => {

/*     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill() */
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    let sizeY = parseInt(theme.sizes.guitarInstrumentTrack.trackScore.height);
    let sizeX = (window.innerWidth - (parseInt(theme.sizes.sideBar.width) * 2));

    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = sizeX * scale;
    canvas.height = sizeY * scale;

    // Normalize coordinate system to use css pixels.
    context.scale(scale, scale);

    let frameCount = 0
    let animationFrameId
    

    const handleResize = e => {
      let sizeY = parseInt(theme.sizes.guitarInstrumentTrack.trackScore.height);
      let sizeX = (window.innerWidth - (parseInt(theme.sizes.sideBar.width) * 2));

      // Set actual size in memory (scaled to account for extra pixel density).
      var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
      canvas.width = sizeX * scale;
      canvas.height = sizeY * scale;

      // Normalize coordinate system to use css pixels.
      context.scale(scale, scale);
    };

    const getMousePos = (evt) => {
      console.log(evt);
      var rect = canvas.getBoundingClientRect();
      return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
      };
    }


    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", getMousePos);



    //Our draw came here
    const render = () => {
      frameCount++
      


      drawBackground(context);
      drawBarLines(context);
      drawBeatLines(context);
      drawNoteLines(context);
      drawStringLines(context);

      draw(context, frameCount)
      
      
      animationFrameId = window.requestAnimationFrame(render)
    }
    
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("resmousemoveize", getMousePos)
    };
    }
  }, [draw])
  
  return <SytledCanvas ref={canvasRef} {...props}/>
});

export default GuitarCanvas