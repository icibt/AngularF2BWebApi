using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.OData;
using APM.WebAPI.Models;

namespace APM.WebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ProductsController : ApiController
    {
        // GET api/products
        [EnableQuery()]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get()
        {
            var productRepository = new ProductRepository();
            return Ok(productRepository.Retrieve().AsQueryable());
        }

        public IEnumerable<Product> Get(string search)
        {
            var productRepository = new ProductRepository();
            return productRepository.Retrieve().Where(x => x.ProductCode.Contains(search));
        }

        // GET api/products/5
        [ResponseType(typeof(Product))]
        [Authorize]
        public IHttpActionResult Get(int id)
        {
            try
            {
                //throw new ArgumentNullException("This is a test");
                var productRepository = new ProductRepository();
                Product product;
                if (id > 0)
                {
                    product = productRepository.Retrieve().FirstOrDefault(x => x.ProductId == id);
                    //return NotFound();
                }
                else
                {
                    product = productRepository.Create();
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        // POST api/products
        [ResponseType(typeof(Product))]
        public IHttpActionResult Post([FromBody]Product product)
        {
            try
            {
                if (product == null)
                    return BadRequest("Product cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var productRepository = new ProductRepository();
                var newProduct = productRepository.Save(product);
                if (newProduct == null)
                    return Conflict();

                return Created<Product>(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT api/products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            try
            {
                if (product == null)
                    return BadRequest("Product cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var productRepository = new ProductRepository();
                var updatedProduct = productRepository.Save(id, product);
                if (updatedProduct == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE api/products/5
        public void Delete(int id)
        {
        }
    }
}
