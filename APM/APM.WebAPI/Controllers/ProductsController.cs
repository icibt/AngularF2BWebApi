using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.OData;
using APM.WebAPI.Models;

namespace APM.WebAPI.Controllers
{
    [EnableCors("*","*","*")]
    public class ProductsController : ApiController
    {
        // GET api/products
        [EnableQuery()]
        public IQueryable<Product> Get()
        {
            var productRepository = new ProductRepository();
            return productRepository.Retrieve().AsQueryable();
        }

        public IEnumerable<Product> Get(string search)
        {
            var productRepository = new ProductRepository();
            return productRepository.Retrieve().Where(x => x.ProductCode.Contains(search));
        }

        // GET api/products/5
        public Product Get(int id)
        {
            var productRepository = new ProductRepository();
            Product product;
            if (id > 0)
            {
                product = productRepository.Retrieve().FirstOrDefault(x => x.ProductId == id);
            }
            else
            {
                product = productRepository.Create();
            }
            return product;
        }

        // POST api/products
        public void Post([FromBody]Product product)
        {
            var productRepository = new ProductRepository();
            var newProduct = productRepository.Save(product);
        }

        // PUT api/products/5
        public void Put(int id, [FromBody]Product product)
        {
            var productRepository = new ProductRepository();
            var newProduct = productRepository.Save(id,product);
        }

        // DELETE api/products/5
        public void Delete(int id)
        {
        }
    }
}
