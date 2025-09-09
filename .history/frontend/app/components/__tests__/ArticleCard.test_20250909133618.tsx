import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleCard from '../ArticleCard';
import '@testing-library/jest-dom';

describe('ArticleCard', () => {
  it('renders the title and excerpt', () => {
    const title = 'Test Title';
    const excerpt = 'Test Excerpt';

    render(<ArticleCard title={title} excerpt={excerpt} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(excerpt)).toBeInTheDocument();
  });
});
