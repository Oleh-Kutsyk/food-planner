import React, { useEffect } from 'react';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useForm,
  FieldValues,
  UseFormReset,
  DefaultValues,
  Mode,
  UseFormReturn,
  FormProvider,
} from 'react-hook-form';

export type TOnSubmitFrom<TFormValues extends FieldValues> = (
  reset: UseFormReset<TFormValues>,
  values: TFormValues
) => void;

type TChildrenCb<TFormValues extends FieldValues> = (
  methods: UseFormReturn<TFormValues>
) => React.ReactNode;

type TFormProps<TFormValues extends FieldValues> = {
  onSubmit: TOnSubmitFrom<TFormValues>;
  defaultValues: DefaultValues<TFormValues> | undefined;
  validationSchema?: AnyObjectSchema;
  children: TChildrenCb<TFormValues>;
  handleWatch?: (name: string, value: string | number | boolean) => void;
  mode?: Mode;
  watchingItems?: string[];
  blackList?: string[];
};

export const Form = <TFormValues extends FieldValues>({
  onSubmit,
  defaultValues,
  validationSchema,
  handleWatch,
  children,
  mode = 'onBlur',
  watchingItems,
  blackList,
}: TFormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues,
    mode,
  });
  const handleSubmit = () => (values: TFormValues) => {
    onSubmit(methods.reset, values);
  };

  useEffect(() => {
    if (!handleWatch) {
      return;
    }

    const subscription = methods.watch((value, { name }) => {
      if (name && blackList?.includes(name)) {
        return;
      }

      if (!watchingItems?.length && name) {
        handleWatch(name, value[name]);
      } else {
        watchingItems?.forEach(item => {
          if (item === name) {
            handleWatch(name, value[name]);
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  return (
    <FormProvider<TFormValues> {...methods}>
      <form
        action='#'
        method='POST'
        className='space-y-6'
        autoComplete='off'
        onSubmit={methods.handleSubmit(handleSubmit())}
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
};
