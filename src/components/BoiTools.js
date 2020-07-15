import React,{Component} from 'react';

export default class BoiTools extends Component{

    render()
    {
        return(
            <div>
            <h3>BOI Tools</h3>
            <p>We have created this website to host innovative tools created by BOI team members.
            This will serve as a platform to use tools that speed up our task. This is an open source 
            project and team members can contribute to this project without impacting existing tools</p>
            <img src={require("../Files/innovation.jpg")} alt="Place holder for Innovation" width="500px" height="300px"/>
            </div>
        )
    }


}