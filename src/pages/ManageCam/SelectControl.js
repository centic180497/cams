import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import { isEmpty } from 'lodash'

export function NoOptionsMessage(props){
    console.log(props)
    return (
        <div></div>
    )
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

export function ProvinceControl(props){
    const value = props.getValue()
    return (
        <TextField 
            variant="outlined"
            fullWidth
            value={isEmpty(value) ? '' : 'have value'}
            label="Tỉnh/Thành phố"
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            InputLabelProps={{
                classes: {
                    root: props.selectProps.classes.inputLabel
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    ) 
}

export function DistrictControl(props){
    const value = props.getValue()
    return (
        <TextField 
            variant="outlined"
            fullWidth
            value={isEmpty(value) ? '' : 'have value'}
            label="Quận/Huyện"
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            InputLabelProps={{
                classes: {
                    root: props.selectProps.classes.inputLabel
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    ) 
}


export function CommuneControl(props){
    const value = props.getValue()
    return (
        <TextField 
            variant="outlined"
            fullWidth
            value={isEmpty(value) ? '' : 'have value'}
            label="Phường/Xã"
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            InputLabelProps={{
                classes: {
                    root: props.selectProps.classes.inputLabel
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    ) 
}

export function CamStateControl(props){
    const value = props.getValue()
    return (
        <TextField 
            variant="outlined"
            fullWidth
            value={isEmpty(value) ? '' : 'have value'}
            label="Trạng thái"
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            InputLabelProps={{
                classes: {
                    root: props.selectProps.classes.inputLabel
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    ) 
}

export function CamModesControl(props){
    const value = props.getValue()
    return (
        <TextField 
            variant="outlined"
            fullWidth
            value={isEmpty(value) ? '' : 'have value'}
            label="Chức năng"
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            InputLabelProps={{
                classes: {
                    root: props.selectProps.classes.inputLabel
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    ) 
}

export function CamResolutionControl(props){
    const value = props.getValue()
    return (
        <TextField 
            variant="outlined"
            fullWidth
            value={isEmpty(value) ? '' : 'have value'}
            label="Độ phân giải"
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            InputLabelProps={{
                classes: {
                    root: props.selectProps.classes.inputLabel
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    ) 
}

export function GroupControl(props) {
    const value = props.getValue()
    return (
        <TextField
            variant="outlined"
            fullWidth
            value={isEmpty(value) ? '' : 'have value'}
            label="Đường/Nhóm"
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            InputLabelProps={{
                classes: {
                    root: props.selectProps.classes.inputLabel
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    )
}