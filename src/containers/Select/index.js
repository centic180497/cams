import React, { Component } from 'react';
import SelectCrossroad from './SelectCrossroad'

const SelectContainer = (props) => {
    if(props.selectType) return null
    switch(props.selectType){
        case 'SELECT_CROSSROAD':
            return <SelectCrossroad />
    }
}

