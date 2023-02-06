//Get Paging data for specfic model
exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = limit;
    return { totalItems, items, totalPages, currentPage };
};
// Get pagination per page items
exports.getPagination = async (page, size) => {
    
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};