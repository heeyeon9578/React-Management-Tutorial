import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper'; //컴포넌트의 외부를 감싸는 것
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const styles = theme=>( {
  root:{
    width: "100%",
    marginTop: theme.spacing.unit*3,
    overflowX: "auto"
  },
  table:{
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit*2
  }
})


// function App() {
//   return (
//     <div className="gray-background">
//       <img src={logo} lat="logo" />
//       <h2>Let's develop management system!</h2>
//     </div>
//   );
// }



/*

1) constructor()

2) componentwillMount()

3) render()

4) componentDidMount()

*/

/*

props or state => shouldComponentUpdate()

*/

//key 사용이 매우 중요!!!
class App extends Component{

  //변경될 수 있는 데이터이므로, state 사용
  state ={
    customers: "",
    completed: 0
  }

  //컴포넌트는 생명주기가 존재, 모두 마운트되었을때 실행되게 해줌.
  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  //비동기적으로 어떤 내용을 수행할 수 있도록 해줌.
  callApi = async () =>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed >=100 ? 0: completed +1 });
  }

  render(){

    //props는 변경될 수 없는 데이터에 쓰임
    const {classes} = this.props;
    return(
     
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {this.state.customers ? this.state.customers.map(c=>{ 
             return ( <Customer key={c.id} id ={c.id} image ={c.image} name = {c.name} birthday ={c.birthday} gender ={c.gender} job={c.job} />)
            }):""

           }

            
          </TableBody>
        </Table>
        </Paper>

    );
  }
}


export default withStyles(styles)(App);
