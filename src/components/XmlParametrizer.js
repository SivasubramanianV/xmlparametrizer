import React,{Component} from 'react';


export default class XmlParametrizer extends Component{
    static pathe = "";    

    constructor(props) {
        super(props) 
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getXPath = this.getXPath.bind(this);      
      
        this.state = {
             selectedFile:'',  
             nodesToBeAdded:[],          
             modifiedHtml:'',
             DataSheet:'',
             
        }
    }

    onFileChange = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
            
    } 
    
    getXPath(node,xpath){    
        
        if(node.parentElement!=null)
        {
            console.log(node.nodeName);
            xpath = "/" + node.nodeName + xpath;
            this.pathe = xpath;
            console.log(this.pathe);
            this.getXPath(node.parentNode,this.pathe);          
            
        }     
        return this.pathe;  
        // if(node.parentNode===null) 
        // {
        //     return "";
        // }
        // return this.getXPath(node.parentNode)+"/"+node.nodeName;
        
    } 

    onSubmit(e)
    {        
        e.preventDefault();
        console.log(this.state.selectedFile.name);

        const file = this.state.selectedFile;
        const reader = new FileReader();
        reader.readAsText(file);
        

        reader.onloadend = (evt) => {
            const readerData = evt.target.result;
            const parser = new DOMParser();
            const xml = parser.parseFromString(readerData,'text/xml'); 
            var i,j;
            var nodesAdded = [];
            var nodeList = xml.documentElement.getElementsByTagName('*');
            
            for(i=0;i<nodeList.length;i++)
            {
                var b = true;                
                if(nodeList[i].childNodes.length>0)
                {
                    for(j=0;j<nodeList[i].childNodes.length;j++)
                    {
                        if(nodeList[i].childNodes[j].nodeType===1)
                        {                            
                            b=false;
                            break;
                        }
                    }
                }
                if(b===true)
                {                                            
                    var xpath=''; 
                    var path = this.getXPath(nodeList[i],xpath); 
                    this.pathe='';
                    console.log(path);
                    for(var c=1;c<10;c++)
                    {                        
                        path = path.replace("/","_");                        
                    }
                    path = path.substring(1);
                    path = "$-{"+path+"}";
                    nodeList[i].innerHTML=path;                       
                    nodesAdded.push(path);                    
                }  
                
            }
            this.setState({
                nodesToBeAdded: nodesAdded,
                modifiedHtml: xml.documentElement
            });
            console.log(this.state.modifiedHtml);  

            var FieldsExcel=[];

            for(var f=0;f<nodesAdded.length;f++)
            {
                var field='';
                var startindex = nodesAdded[f].indexOf("{")+1;
                var endindex = nodesAdded[f].indexOf("}");
                field = nodesAdded[f].substring(startindex,endindex);
                FieldsExcel.push(field);
            }
            
            var outputdata =[];
            outputdata.push(FieldsExcel);

            const XLSX = require('xlsx');
            const wb = XLSX.utils.book_new();

            wb.SheetNames.push("Data");
            
            var ws_data = outputdata;
            var ws = XLSX.utils.aoa_to_sheet(ws_data);
            wb.Sheets["Data"]=ws;
            XLSX.writeFile(wb,"Datasheet.xlsx"); 
            
        }

    }    
    render()
    {
        return(
            <div>
            <h3>Xml Parametrizer and Data Sheet Creator</h3>
            <p>This tool will parametrize the XML nodes and also create an Excel sheet with parameters</p>                      
            <div>
            <label>Xml File Upload:
            <input type="file" onChange={this.onFileChange} />    
            </label>         
            <br/>
            <br/>
            <button onClick={this.onSubmit}>Parametrize Xml & Prepare Data Sheet!</button>            
            </div>
            <br/>
            <br/>
            <div className="form-group">            
            <strong>Resulting Parametrized XML:</strong>            
            <textarea rows="5" className ="form-control" id="tgtXml" value={this.state.modifiedHtml.innerHTML} spellCheck="false"></textarea>
            </div>            
            </div>

        )
    }


}