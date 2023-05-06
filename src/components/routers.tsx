import React, { Fragment, JSXElementConstructor } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

export interface TMFRouteProps {
  path: string;
  component?: JSXElementConstructor<any>;
}

export interface IRouterProps extends TMFRouteProps {
  child?: IRouterProps[];
  isDefault?: boolean;
}

const CustomRouters = ({ routers }: { routers: IRouterProps[] }): JSX.Element => (
  <Routes>
    {routers.map(
      (router: IRouterProps, i: number): JSX.Element =>
        router.isDefault ? (
          <Route
            index
            key={`_${i ** 1}_${router.path}`}
            path={router.path}
            element={router.component && <router.component />}
          />
        ) : (
          <Fragment key={`_${i ** 1}_${router.path}`}>
            <Route path={router.path}>
              <Route index element={router.component && <router.component />} />
              {router.child?.length && <Route path="*" element={<CustomRouters routers={router.child} />} />}
            </Route>
            <Route index path="*" element={<Navigate replace to="" />} />
          </Fragment>
        )
    )}
  </Routes>
);

export const MFRouters = CustomRouters;
