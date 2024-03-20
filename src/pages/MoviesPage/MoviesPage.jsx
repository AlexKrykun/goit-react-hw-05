import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';
import fetchData from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const value = params.get('query') ?? '';

  useEffect(() => {
    async function getData() {
      if (value === '') {
        setMovies([]);
        return;
      }

      try {
        const data = await fetchData(
          `search/movie?query=${value}&include_adult=false&language=en-US`
        );

        if (data.total_results === 0) {
          toast('Nothing was found for your request!', { icon: '❗️' });
        }

        setMovies(data.results);
      } catch {
        toast.error('Something went wrong! Please reload the page!');
      }
    }
    
    getData();
  }, [value]);

  const handleSubmit = (values, actions) => {
    if (values.query === '') {
      toast.error('Please enter a search term');
      setMovies([]);
      return;
    }

    params.set('query', values.query);
    setParams(params);
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field type='text' name='query' />
          <button type='submit'>Search</button>
        </Form>
      </Formik>
      <div className={css.list}>
        <MovieList movies={movies} state={{ from: location }} />
      </div>
    </div>
  );
}
