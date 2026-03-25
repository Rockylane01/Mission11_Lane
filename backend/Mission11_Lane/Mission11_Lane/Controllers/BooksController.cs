using Microsoft.AspNetCore.Mvc;
using Mission11_Lane.Models;

namespace Mission11_Lane.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _repository;

        public BooksController(IBookRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks(
            int page = 1,
            int pageSize = 5,
            string? sort = null)
        {
            var result = await _repository.GetBooksAsync(page, pageSize, sort);

            return Ok(new
            {
                items = result.Items,
                page = result.Page,
                pageSize = result.PageSize,
                totalItems = result.TotalItems,
                totalPages = result.TotalPages,
            });
        }

        [HttpGet("GetCategories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _repository.GetCategoriesAsync();

            return Ok(categories);
        }
    }
}

