import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ProductCard from './Card'; // Ensure this component exists
import { Box, Pagination, Button } from '@mui/material';
import '../index.css';

function Api() {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (category) {
      const filtered = data.filter(item => item.category.toLowerCase() === category.toLowerCase());
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [category, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const resetFilter = () => {
    setCurrentPage(1);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" gutterBottom>
        Error loading data.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        border: '1px solid #000',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: 2,
        margin: '10px',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>

      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button variant="outlined" onClick={resetFilter}>
          All Products
        </Button>
      </Box>
      <div>
        {currentItems.length === 0 ? (
          <div className="col-span-1">
            <Typography variant="h6" align="center">
              No products found.
            </Typography>
          </div>
        ) : (
          currentItems.map((item) => (
            <div key={item.id}>
              <ProductCard item={item} />
            </div>
          ))
        )}
      </div>
      <Box display="flex" justifyContent="center" marginTop={6}>
        <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={currentPage}
          onChange={paginate}
          variant="outlined"
          color="primary"
        />
      </Box>
      <Typography variant="body2" align="center" color="textSecondary">
        Showing {currentItems.length} of {filteredData.length} products
      </Typography>
      
    </Box>
  );
}

export default Api;
