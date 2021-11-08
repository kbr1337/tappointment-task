import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { LoadFromMemory, WriteToMemory } from './Controller'

const CalcWrapper = styled.div`
    display: flex;
    flex-direction: column;

    h1{
        color: rgb(255,255,255,.75);
        margin-bottom 2.5rem;
    }

    width: 100%;
    height: 100vh;

    align-items: center;
    justify-content:center;

`

const Calc = styled.div`
    display: flex;
    flex-direction: column;
    // margin: auto;

    color: #fff;
    background: var(--clrCalcButton);



    border-radius: var(--radius);
`

const CalcDisplay = styled.div`
    display: flex;
    padding: 1rem;
    background: var(--clrCalcDisplay);
    min-height: 10vh;

    align-items: center;
    
    border-top-left-radius:  var(--radius);
    border-top-right-radius:  var(--radius);
`

const CalcKeypad = styled.section`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: repeat(5,1fr);

    & > button{
        appearance: none;
        border: none;
        background: var(--clrCalcButton);
        padding: 1rem;
        margin: 1rem;
        color: #fff;

        font-weight: 600;
        font-size: var(--pSize);
        border-radius: var(--radius);
        user-select: none;
        transition: filter 0.2s ease-out;

        &:hover{
        filter: brightness(90%);

            cursor: pointer;
        }
    }
`

const Debug = styled.div`
    position: fixed;
    left: 20%;
    top: 40%;
    z-index: 666;
`

const KeypadElems = [
    'Mentés', 'Betöltés', 'C', '%',
    '1', '2', '3', '*',
    '4', '5', '6', '-',
    '7', '8', '9', '+',
    '0', '.', '=', '/',
    '+ / -'
]



const Calculator = () => {

    const [DisplayValue, setDisplayValue] = useState('')
    const [CurrentValue, setCurrentValue] = useState(null)
    const [Operation, setOperation] = useState(null)
    const [HadOpeartion, setHadOpeartion] = useState(false)

    const Operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '%': (a, b) => a % b,
        '=': (a, b) => a
    }

    const isOpeariton = (btn) => (btn === '%' || btn === '/' || btn === '+' || btn === '-' || btn === '*' || btn === '=')

    const HandleButton = async (e, btn) => {


        switch (btn) {

            case '+ / -':
                setDisplayValue(String(Number(DisplayValue) * -1))

                // if (CurrentValue)
                //     setCurrentValue(p => p = p * -1)
                break

            case 'Betöltés':
                var resp = await LoadFromMemory()
                setDisplayValue(String(resp))
                setCurrentValue(Number(resp))
                break
            case 'Mentés':

                if (isNaN(Number(DisplayValue)) && isNaN(CurrentValue))
                    return alert("Invalid value, couldn't write to memory")

                await WriteToMemory(CurrentValue || DisplayValue)

                break
            case 'C':
                setDisplayValue('')
                setCurrentValue(null)
                setHadOpeartion(false)
                break
            default:

                if (isOpeariton(btn)) {

                    var DisplayNum = Number(DisplayValue)

                    if (CurrentValue === null) {
                        setCurrentValue(DisplayNum)
                    } else if (Operation) {

                        var curVal = CurrentValue || 0
                        const newValue = Operations[Operation](curVal, DisplayNum)

                        setCurrentValue(Number(newValue))
                        setDisplayValue(String(newValue))
                    }

                    setOperation(btn)
                    setHadOpeartion(true)

                } else {

                    if (!HadOpeartion) {
                        setDisplayValue(p => p = p + btn)
                    } else {
                        setDisplayValue(btn)
                        setHadOpeartion(false)
                    }

                }

                break
        }

    }

    return (
        <CalcWrapper>
            <h1>Tappointment Calc</h1>

            {/* <Debug>
                <h2>{CurrentValue}</h2>
                <h2>{DisplayValue}</h2>
                <h2>{String(HadOpeartion)}</h2>
            </Debug> */}
            <Calc>
                <CalcDisplay>
                    <h2>{DisplayValue}</h2>
                </CalcDisplay>

                <CalcKeypad>
                    {KeypadElems.map(curElem => curElem !== null ? <button onClick={e => HandleButton(e, curElem)} key={curElem}>{curElem}</button> : null)}
                </CalcKeypad>
            </Calc>
        </CalcWrapper>
    )
}

export default Calculator
