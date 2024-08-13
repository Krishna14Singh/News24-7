import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    
    constructor(){
      super();
        console.log("constructor");
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0

        }
    }
    //lifecycle method(it is outside constructor, it run after render)
    async componentDidMount(){
      let url=`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4d60af60d0c4429089123b2314137699&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data= await fetch(url); //it return Promise and fetch is used to fetch api and async function apne func me wait kr ksta h kuch promise k awake hone ka
      // Data is now a promise which can be converted to any type
      let parsedData= await data.json();
      console.log(parsedData);
      
      this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false});
    }
    onPrevClick=async()=>{
      let url=`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4d60af60d0c4429089123b2314137699&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data= await fetch(url); //it return Promise and fetch is used to fetch api and async function apne func me wait kr ksta h kuch promise k awake hone ka
      // Data is now a promise which can be converted to any type
      let parsedData= await data.json();
      console.log(parsedData);
      
      this.setState({articles:parsedData.articles,page:this.state.page-1,loading:false});

    }
    onNextClick=async()=>{
      console.log(this.state.totalResults);
      if(Math.ceil(this.state.totalResults/this.props.pageSize)>this.state.page){
        let url=`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4d60af60d0c4429089123b2314137699&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url); //it return Promise and fetch is used to fetch api and async function apne func me wait kr ksta h kuch promise k awake hone ka
        // Data is now a promise which can be converted to any type
        let parsedData= await data.json();
        this.setState({articles:parsedData.articles,page:this.state.page+1,loading:false});
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center mb-4">News24/7 Top Headlines</h2>
       {this.state.loading&&<Spinner/>}   {/*if loading true hai tbhi spinner ko dikhaye */}
        
        <div className="row">
        {!this.state.loading && this.state.articles.map(
            (element)=>{ 
            return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} urlToImage={element.urlToImage} url={element.url} />
                    </div>}
        )}

</div>
        <div className="container d-flex justify-content-between my-4">
        
          <button disabled={this.state.page===1} type="button" className="btn btn-dark btn-sm" onClick={this.onPrevClick}>&larr; Previous</button>
          <button disabled={Math.floor(this.state.totalResults/this.props.pageSize)<this.state.page} type="button" className="btn btn-dark btn-sm" onClick={this.onNextClick}>Next 	&rarr;</button>

        
        </div>
      </div>
    )
  }
}
export default News
