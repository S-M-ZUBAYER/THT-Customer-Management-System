import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AllProductContext } from '../../../../../context/ProductContext';


const ProductDetailsLayout = () => {
  const {Product}=useContext(AllProductContext);

    return (
        <div>
            <header aria-label="Site Header" class="bg-white">
  <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 my-10">
    <div class="flex h-16 items-center justify-center">
  
      <div class="hidden md:block">
        <nav aria-label="Site Nav">
          <ul class="flex items-center gap-6 text-base">
            <li>
              <Link
                class="text-gray-500 transition hover:text-gray-500/75"
                to={`/admin/mallProduct/details/${Product?.Model}/afterSales`}
              >
                After-sales
              </Link>
            </li>

            <li>
              <Link
                class="text-gray-500 transition hover:text-gray-500/75"
                to={`/admin/mallProduct/details/${Product?.Model}/instruction`}
              >
                After-sales Instructions
              </Link>
            </li>

            <li>
              <Link
                class="text-gray-500 transition hover:text-gray-500/75"
                to={`/admin/mallProduct/details/${Product?.Model}/inventory`}
              >
                Inventory
              </Link>
            </li>

            <li>
              <Link
                class="text-gray-500 transition hover:text-gray-500/75"
                to={`/admin/mallProduct/details/${Product?.Model}/invoice`}
              >
                Invoice
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      
    </div>
  </div>
</header>

<Outlet></Outlet>

        </div>
    );
};

export default ProductDetailsLayout;