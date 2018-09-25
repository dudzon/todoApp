class TodoForm extends React.Component{
    state = {
        todos:[],
        todosList:[],
        validFormTitle:false,
        validFormDescription:true
    }

    // They say that refs are obsolete but this is very small application so sometimes they come in handy
    titleInput = React.createRef();
    descriptionInput = React.createRef();
     

    // Updating the todo title 
    
    handleTitleChange = (event) => {
        // Reversing to the initial title state after submitting the form or negative validation 
     this.clearFormStateTitle();
      let newTitle = event.target.value;
        this.setState( prevState => ({
            todos:{
                ...prevState.todos,
                title:newTitle
            }
          }))
          this.validateTitleInput();
    }

    //  Validating the length of the title input

    validateTitleInput(){
        const checkLength = this.titleInput.current.value.length;
        if(  checkLength >= 10 && checkLength <= 255 ){
           this.setState({
               validFormTitle:true
           })
        }
    }

    // Helper function for title input 

    clearFormStateTitle = () =>{
        this.setState({
            validFormTitle: false
        })
      }

    // Updating the todo description 

    handleDescriptionChange = (event) => {
        // Reversing to the initial input description state. It's true because this field is optional when validated.  
        this.clearFormStateDescription(); 
        let newDescription = event.target.value;
        this.setState( prevState => ({
            todos:{
                 ...prevState.todos,
                description:newDescription
                }
        }))
        this.validateDescriptionInput()
      }
     
      //  Validating the length of the description input

      validateDescriptionInput(){
        const checkLength = this.descriptionInput.current.value.length;
        if(  checkLength > 255 ){
           this.setState({
               validFormDescription:false
           })
        }
    }

    // Helper function for description input 

    clearFormStateDescription = () =>{
        this.setState({
            validFormDescription: true
        })
      }

    //  Form submission
      handleSubmit = (event) => {
        event.preventDefault();

        // Validation if the given conditions are met

        if( this.state.validFormTitle && this.state.validFormDescription ){
            this.setState( prevState => ({
                todosList:[
                    ...prevState.todosList,
                    this.state.todos
                ],
            })) 
        }
        // Just to be sure what's going on :)
        console.log(`'New todo added: ${this.state.todos.title} ${this.state.todos.description} `)
        console.log(this.state)

        // Clear the current todo, waiting for another 
        this.clearTodos();
      }

      clearTodos = () => {
          this.setState( prevState => ({
              todos:{
                  ...prevState.todos,
                  title:'',
                  description:''
              }
          }))
      }

    //   Check if the inputs value met the given conditions

      checkValidity = () => {
          const checkTitleLength = this.titleInput.current.value.length;
          const checkDescLength = this.descriptionInput.current.value.length;

          if( !this.state.validFormTitle){
                 if( checkTitleLength < 10){
                     alert('Tytuł za krótki')
                  
                 }
                 if( checkTitleLength > 255){
                     alert('Tytuł za długi')
                 }
          }
          if( !this.state.validFormDescription){
              if( checkDescLength > 255){
                  alert('Opis za długi')
              }
          }
      }
    

    //  That's clear 
    removeLastTodo = ( event ) =>{
          event.preventDefault();
          const newTodoList = this.state.todosList.slice();
          const removeLast = newTodoList.splice( newTodoList.length -1,1)
          this.setState({ todosList:newTodoList })
        }

    // That's also clear

    removeAllTodos = ( event ) =>{
         event.preventDefault();
         this.setState({
             todosList :[]
         })
     }
    render(){
        const todosTitle = this.state.todosList.length ? 'Twoje tuduusy :( ' : 'Fajrant, nie masz tuduusów :)'
        let todoItem;
        if( this.state.todosList.length ){
            todoItem = this.state.todosList.map( (item, index) => {
                return(
                    <div className = "px-0" key = { index }>
                        <h3 style= {{color:'red'}}> { item.title } </h3>
                        <p> { item.description }</p>
                    </div>
                )
            })
        }
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-6 mx-auto my-0">
                        <form action="" method="" onSubmit = { this.handleSubmit }>
                            <div className="form-group">
                                <label htmlFor="todoTitle">Todo title</label>
                                <input type="text" className="form-control" id="todoTitle" aria-describedby="todoTitle" placeholder="Enter Todo" name = "todoTitle" onChange = { this.handleTitleChange } value ={ this.state.todos.title } ref = { this.titleInput } required />
                            </div>
                            <div className="form-group">
                                <label for="todoDesc">Todo Description</label>
                                <textarea type="text" className="form-control" id="todoDesc" placeholder="Todo Description" name="todoDesc" rows="10" onChange = { this.handleDescriptionChange } value ={ this.state.todos.description} ref = { this.descriptionInput }/>
                            </div>
                            <div className="d-flex justify-content-sm-between">
                                <button type="submit" className="btn btn-primary mr-5" onClick ={ this.checkValidity }>Add Todo</button>
                                <button className="btn btn-danger mr-5" onClick = { this.removeAllTodos }>Clear Todos</button>
                                <button className="btn btn-warning" onClick = { this.removeLastTodo }>Remove Todo</button>
                            </div>
                        </form>
                    </div>
                </div>
                <h2 className="mt-5 text-center">{ todosTitle }</h2>
                <div className="container">
                    <div className="col-sm-12 col-md-6 mx-auto my-0">
                    {todoItem}
                    </div>
                </div>
            </div>
        )
    }
}

const root = document.querySelector('#root');
ReactDOM.render(<TodoForm />, root);