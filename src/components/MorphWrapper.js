import { useEffect, useState,useRef } from "react";
import chroma from "chroma-js";



const MorphWrapper = (props) => {
    const wrapperColor = props.color? props.color:'#9094fe';
    const wrapperRadius = useRef(props.radius? props.radius:50);
    const shadowType = useRef(props.type? props.type:'flat');
    const direction = useRef(props.direction?  props.direction:'topLeft');
    const offset = useRef(props.offset? props.offset:20);
    const blur = useRef(props.blur? props.blur:offset.current*2);
    
    const wrapperBackground = useRef(wrapperColor);
    const wrapperShadow = useRef('');
    const sDirection = useRef([1, 1, -1, -1]);
    const lightShift = useRef(.4);
    const darkShift = useRef(.4);
    const gradShift = useRef(.2);

    const width = props.width && props.width;
    const height = props.height && props.height;
    const margin = props.margin && props.margin;

    const wrapperBody = useRef(null);
                                                                            
    // █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
    // ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝
                                                                            
                                  
    const setBackground = () => {

        var newDarkColor;
        var newLightColor;


        const shadowLight = chroma(wrapperColor).hsv();
        shadowLight[2] = shadowLight[2] + (shadowLight[2] * gradShift.current);
        const newLight = chroma.hsv(shadowLight).hex();
        newLightColor = newLight;


        const shadowDark = chroma(wrapperColor).hsv();
        shadowDark[2] = shadowDark[2] - (shadowDark[2] * gradShift.current);
        const newDark = chroma.hsv(shadowDark).hex();
        newDarkColor = newDark;


        var angle;
        
        if (sDirection.current.toString() == [1, 1, -1, -1].toString()) {
            angle = '145deg';
        }
        else if (sDirection.current.toString() == [-1, 1, 1, -1].toString()) {
            angle = '225deg';
        }
        else if (sDirection.current.toString() == [-1, -1, 1,1].toString()) {
            angle = '315deg';
        }
        else if (sDirection.current.toString() == [1, -1, -1, 1].toString()) {
            angle = '45deg';
        }


        if ( shadowType.current == 'concave') {
            wrapperBody.current.style.background = `linear-gradient(${angle}, ${newDarkColor}, ${newLightColor})`;
        }
        else if ( shadowType.current == 'convex') {
            wrapperBody.current.style.background = `linear-gradient(${angle}, ${newLightColor}, ${newDarkColor})`;
        } else {
            wrapperBody.current.style.background = wrapperColor.current;
        }

    }
    

    const setDirection = () => {
        

        if (direction.current == 'topLeft') {
            sDirection.current = [1, 1, -1, -1];
        } 
        else if (direction.current == 'topRight') {
            sDirection.current = [-1, 1, 1, -1];
        } 
        else if (direction.current == 'bottomLeft') {
            sDirection.current = [1, -1, -1, 1];
        }
        else if (direction.current == 'bottomRight') {
            sDirection.current = [-1, -1, 1, 1];
        }


    }



    const createShadow = () => {

        var lightColor;
        var darkColor;


        // creates the two shadow colors
        const shadowLight = chroma(wrapperColor).hsv();
        shadowLight[2] = shadowLight[2] + (shadowLight[2] * lightShift.current);
        const newLight = chroma.hsv(shadowLight).hex();
        lightColor = newLight;


        const shadowDark = chroma(wrapperColor).hsv();
        shadowDark[2] = shadowDark[2] - (shadowDark[2] * darkShift.current);
        const newDark = chroma.hsv(shadowDark).hex();
        darkColor = newDark;


        var newShadow;
        
        if (shadowType.current=='inset') {
            newShadow = `inset ${sDirection.current[0]*offset.current}px ${sDirection.current[1]*offset.current}px ${blur.current}px ${darkColor}, 
                    inset ${sDirection.current[2]*offset.current}px ${sDirection.current[3]*offset.current}px ${blur.current}px ${lightColor}`;
        }
        else {
            newShadow = `${sDirection.current[0]*offset.current}px ${sDirection.current[1]*offset.current}px ${blur.current}px ${darkColor}, 
                    ${sDirection.current[2]*offset.current}px ${sDirection.current[3]*offset.current}px ${blur.current}px ${lightColor}`;
        }

        wrapperShadow.current = newShadow;
        wrapperBody.current.style.boxShadow = newShadow;
    }



    useEffect(() => {
        setDirection();
        createShadow();
        setBackground();
    },[])


    const morphStyle={
        default:{
            width:width&&width,
            height:height&&height,
            background:wrapperBackground.current,
            borderRadius:wrapperRadius.current+'px',
            boxShadow:wrapperShadow.current,
            margin:margin && margin
            // border:'1px solid black'
        }
    }


    return(
        <div ref={wrapperBody} style={morphStyle.default}>
            {props.children}
        </div>
    )

}



export default MorphWrapper;
