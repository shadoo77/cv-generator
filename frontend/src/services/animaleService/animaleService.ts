import RequestService from '../requestService';

function fetchDogsBySearchTerm(searchTerm: string) {
  const url = `https://dog.ceo/api/breed/${searchTerm}/images/random`;
  return RequestService.fetch(url);
}

function fetchCatsBySearchTerm(searchTerm: string) {
  const url = 'https://api.thecatapi.com/v1/breeds';
  const qs = { q: searchTerm };
  return RequestService.fetch(url, { qs, xApiKey: true });
}

const animaleService = {
  fetchDogsBySearchTerm,
  fetchCatsBySearchTerm
};

export default animaleService;
