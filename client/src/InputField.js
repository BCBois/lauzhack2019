import React, {useState} from 'react';

function useInputField() {
    const [fieldState, setFieldState] = useState("")

    return {(
        <div className="fieldInput">
            <textarea onChange={event => setFieldState(event.target.value)}></textarea>
        </div>
    ), fieldState}
}