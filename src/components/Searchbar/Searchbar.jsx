import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { SearchbarClass, Form, Input, Button, Span } from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = (e) => {
    setImageName(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast('Please enter text in the search field');
      return;
    }
    onSubmit(imageName);
    setImageName('')
  };

  return (
    <>
      <SearchbarClass>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="imageName"
            value={imageName}
            onChange={handleNameChange}
          />
          <Button type="submit">
            <FaSearch size={24} />
            <Span>Search</Span>
          </Button>
        </Form>
      </SearchbarClass>
    </>
  );
}



