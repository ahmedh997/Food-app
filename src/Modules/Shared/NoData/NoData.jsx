import React from 'react'
import notFoundImg from '../../../assets/images/Not-found-delete.png'

export default function NoData() {
  return <>
  
      <div className="container rounded-4 p-4">
          <div className="row">
            <div className="img-notfound">
                <img width={300} src={notFoundImg} alt="No Data" />
            </div>
            <div>
                <h4>No data to show!</h4>
            </div>
        </div>
    </div>
  
  </>
}
