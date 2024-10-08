import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, urlToImage, url}=this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={urlToImage} className="card-img-top"  alt="Card cap"/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={url} className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
export default NewsItem