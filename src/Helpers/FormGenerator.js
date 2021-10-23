
const elementTemplate = {
    type : "text",
    value : "value",
    name : "name",
    choices : ["choice 1", "choice 2"],
    min : 0,
    max : 100,
    rows : 5,
    label: "Input"
}

const elementGenerator = (element) => {
    const {type, name, value} = element;
    switch(type){
        case "text":
        case "email":
        case "password":
            return <input 
                        type={type} 
                        name={name} 
                        value={value} 
                        className="custom-input"
                    />
        case "number":
            return <input
                        type={type}
                        name={name}
                        value={value}
                        className="custom-input"
                        min={element.min}
                        max={element.max}
                    />
        case "textarea":
            return <textarea
                        name={name}
                        value={value}
                        className="custom-input"
                        rows={element.rows}
                    ></textarea>
        case "select":
            const {choices} = element;
            return <select
                        name={name}
                        value={value}
                        className="custom-input"
                        >
                            {choices.map((choice, index) => {
                                return <option key={index} value={choice.value}>
                                    {choice.label}
                                    </option>
                            })}
                        </select>
    }
}


const formGenerator = (form) => {
    let output = [];
    output = form.map((element, index) => {
        const {name, label} = element;
        return <div className="input-group" key={index}>
            <label htmlFor={name}>{label}</label>
            {elementGenerator(element)}
        </div>
    });
    return output;
}

export default formGenerator;