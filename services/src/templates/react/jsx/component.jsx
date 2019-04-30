// Imports




// Stateful components

export class MyComponent extends React.Component{

    // Lifecycle 

    constructor(props) {
        super(props);

        this.state = {};

        // Binds
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        var this_component = this;
        
        this_component.awesomeFunction();
    }


    // Events

    clickHandler(event) {
        event.preventDefault();

        var this_component = this;
        
        this_component.awesomeFunction();
    }


    // Functions

    awesomeFunction() {
        var this_component = this;

        console.log('My awesome component!');
    }


    // Render

    render() {
        var this_component = this;
        
        return (
            <div className="mycomponent__wrapper">
                <span>Hello, component!</span>
            </div>
        );
    }

};
