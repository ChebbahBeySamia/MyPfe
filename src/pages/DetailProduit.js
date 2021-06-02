import React from 'react'

 const DetailProduit = (props) => {
     console.log('propsss',props.detailProduit)
   
    return (
        <div>
           
        <div className="breadcrumb-wrap">
            <div className="container-fluid">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Accueil</a></li>
                    <li className="breadcrumb-item"><a href="#">Produits</a></li>
                    <li className="breadcrumb-item active">Detail Produit</li>
                </ul>
            </div>
        </div>
        
        <div className="product-detail">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                    { props.detailProduit.map((detail, index) => {
           
           const { title , description, image,TTC, ID} = detail;
           console.log('object',detail.title);
           return(
                        <div className="product-detail-top">
                        
                            <div className="row align-items-center">
                         
                                <div className="col-md-5">
                                    
                                    <div className="product-slider-single-nav normal-slider">
                                        <div className="slider-nav-img"><img src={detail.image} alt="Product Image" /></div>
                                        {/* <div className="slider-nav-img"><img src="img/slide1.jpg" alt="Product Image" /></div>
                                        <div className="slider-nav-img"><img src="img/slide1.jpg" alt="Product Image" /></div>
                                        <div className="slider-nav-img"><img src="img/slide1.jpg" alt="Product Image" /></div>
                                        <div className="slider-nav-img"><img src="img/slide1.jpg" alt="Product Image" /></div>
                                        <div className="slider-nav-img"><img src="img/slide1.jpg" alt="Product Image" /></div> */}
                                    </div>
                                </div>
           
                                <div className="col-md-7">
                                    <div className="product-content">
                                        <div className="title"><h2>{detail.title}</h2></div>
                                        <div className="ratting">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="price">
                                            <h4>Prix:</h4>
                                            <p>{detail.TTC} <span>100</span></p>
                                        </div>
                                      
                                      
                                       
                                        <div className="action">
                                            <a className="btn" href="#"><i className="fa fa-shopping-cart"></i>Ajouter au panier</a>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

{/* description produit */}

<div class="row product-detail-bottom">
<div class="col-lg-12">
    <ul class="nav nav-pills nav-justified">
        <li class="nav-item">
            <a class="nav-link active" data-toggle="pill" href="#description">Description</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="pill" href="#specification">Specification</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="pill" href="#reviews">Reviews (1)</a>
        </li>
    </ul>

    <div class="tab-content">
        <div id="description" class="container tab-pane active">
            <h4>Product description</h4>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum quam ac mi viverra dictum. In efficitur ipsum diam, at dignissim lorem tempor in. Vivamus tempor hendrerit finibus. Nulla tristique viverra nisl, sit amet bibendum ante suscipit non. Praesent in faucibus tellus, sed gravida lacus. Vivamus eu diam eros. Aliquam et sapien eget arcu rhoncus scelerisque. Suspendisse sit amet neque neque. Praesent suscipit et magna eu iaculis. Donec arcu libero, commodo ac est a, malesuada finibus dolor. Aenean in ex eu velit semper fermentum. In leo dui, aliquet sit amet eleifend sit amet, varius in turpis. Maecenas fermentum ut ligula at consectetur. Nullam et tortor leo. 
            </p>
        </div>
        <div id="specification" class="container tab-pane fade">
            <h4>Product specification</h4>
            <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
            </ul>
        </div>
        <div id="reviews" class="container tab-pane fade">
            <div class="reviews-submitted">
                <div class="reviewer">Phasellus Gravida - <span>01 Jan 2020</span></div>
                <div class="ratting">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                </p>
            </div>
            <div class="reviews-submit">
                <h4>Give your Review:</h4>
                <div class="ratting">
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <div class="row form">
                    <div class="col-sm-6">
                        <input type="text" placeholder="Name"></input>
                    </div>
                    <div class="col-sm-6">
                        <input type="email" placeholder="Email"></input>
                    </div>
                    <div class="col-sm-12">
                        <textarea placeholder="Review"></textarea>
                    </div>
                    <div class="col-sm-12">
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>





                        
                            
                        </div> 
                        );
                    })}  
                    </div>
      
                </div>
            </div>
        </div>
 
       </div>
       
    )
}
export default DetailProduit;