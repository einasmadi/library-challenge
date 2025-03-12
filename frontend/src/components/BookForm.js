import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import useAuthors from "@/hooks/useAuthors";

export default function BookForm({
  onSubmit,
  initialData = {},
  isPending = false
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialData,
      author: null
    },
  });

  const currentYear = new Date().getFullYear();

  const {
    isLoading,
    showAuthorInput,
    authorOptions,
    setShowAuthorInput,
  } = useAuthors(initialData.author_name, setValue);

  // Watch the author dropdown value
  const selectedAuthor = watch('author');

  // Show/hide the author name input based on dropdown selection
  useEffect(() => {
    if (selectedAuthor?.value === 'new') {
      setShowAuthorInput(true);
      setValue('author_name', '');
    } else {
      setShowAuthorInput(false);
      setValue('author_name', selectedAuthor?.label || '');
    }
  }, [selectedAuthor, setValue, setShowAuthorInput]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            placeholder="Enter book title"
          />
          {errors.title && <p className="error-message">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            id="year"
            type="number"
            {...register('year', {
              required: 'Year is required',
              validate: {
                notFuture: (value) =>
                  value <= currentYear || `Year cannot be greater than ${currentYear}`,
              },
            })}
            placeholder="Enter book publication year"
          />
          {errors.year && <p className="error-message">{errors.year.message}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            {...register('status', { required: 'Status is required' })}
          >
            <option value="">Select Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
          {errors.status && <p className="error-message">{errors.status.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          {isLoading ? (
            <p>Loading authors...</p>
          ) : (
            <Controller
              name="author"
              control={control}
              rules={{ required: 'Author is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={authorOptions}
                  placeholder="Select Author"
                  isClearable
                  id="author"
                />
              )}
            />
          )}
          {errors.author && <p className="error-message">{errors.author.message}</p>}
        </div>
      </div>

      {/* Show author name input if "Create New Author" is selected */}
      {showAuthorInput && (
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="author_name">New Author Name:</label>
            <input
              id="author_name"
              type="text"
              {...register('author_name', {
                required: showAuthorInput ? 'Author name is required' : false,
              })}
              placeholder="Enter author's name"
            />
            {errors.author_name && (
              <p className="error-message">{errors.author_name.message}</p>
            )}
          </div>
        </div>
      )}

      <button type="submit" disabled={isPending} className="submit-button">
        {isPending ? 'Submitting' : 'Submit'}
      </button>
    </form>
  );
}