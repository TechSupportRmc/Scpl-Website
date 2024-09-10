import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Carousel = () => {
    return (
        <div className="container cta-100">
      <div className="container">
        <div className="row blog">
          <div className="col-md-12">
            <div id="blogCarousel" className="carousel slide container-blog" data-ride="carousel">
              <div className="section-title text-center">
                <h1 style={{ marginTop: '-1.5rem', marginBottom: '1rem' }}>Packaging Testing</h1>
              </div>
              {/* Carousel items */}
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    {/* Repeat the following block for each item */}
                    <div className="col-md-4">
                      <div className="item-box-blog">
                        <div className="item-box-blog-image">
                          {/* Date */}
                          {/* Image */}
                          <figure>
                            <img
                              alt=""
                              src="../chemists.jpg"
                            />
                          </figure>
                        </div>
                        <div className="item-box-blog-body">
                          {/* Heading */}
                          <div className="item-box-blog-heading">
                            <a href="#" tabIndex="0">
                              <h5>Sample Crush Tester</h5>
                            </a>
                          </div>
                          <br />
                          {/* Read More Button */}
                          <Link to="/SampleCrushTester" className="get-started-btn">
                            View Products
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* End of item */}
                  </div>
                  {/* .row */}
                </div>
                {/* .carousel-item */}
              </div>
              {/* .carousel-inner */}
            </div>
            {/* .Carousel */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel
