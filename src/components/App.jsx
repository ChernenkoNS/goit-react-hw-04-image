import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { Button } from './Button/Button';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchValue.length === 0) {
      return;
    }
    setLoading(true);

    fetch(
      `https://pixabay.com/api/?key=36761319-d149b7033a361911a7c88355b&q=${searchValue}&image_type=photo&per_page=12&page=${page}&orientation=horizontal&safesearch=true`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })

      .then(data => {
        setData(prevState => [...prevState, ...data.hits]);
        setTotal(data.total);
      })
      .finally(() => setLoading(false))
      .catch(error => {
        console.log('error');
      });
  }, [searchValue, page]);

  const handleButtonChange = () => {
    setPage(prevPaga => prevPaga + 1);
  };

  const openModal = src => {
    setShowModal(true);
    setSelectedImage(src);
  };

  const handleValueSubmit = searchValue => {
    if (searchValue.length === 0) {
      alert('Please fill in the input field');
      return;
    }
    setSearchValue(searchValue);
    setData([]);
    setTotal(0);
    setPage(1);
  };

  return (
    <>
      <Searchbar handleValueSubmit={handleValueSubmit} />
      <ImageGallery data={data} openModal={openModal} />

      {loading && <Loader />}

      {data.length !== 0 && total > data.length && (
        <Button onClick={handleButtonChange} />
      )}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          selectedImage={selectedImage}
        />
      )}
    </>
  );
};

