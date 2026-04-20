import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/pages/admin-panel-component/admin-panel-component';
import { Categoryaddcomponent } from './admin/pages/categoryaddcomponent/categoryaddcomponent';
import { CategorySettingsComponent } from './admin/pages/category-settings-component/category-settings-component';
import { LoginComponent } from './admin/pages/login-component/login-component';
import { ProductAddComponent } from './admin/pages/product-add-component/product-add-component';
import { ProductSettings } from './admin/pages/product-settings/product-settings';
import { CategoriesComponent } from './component/categories-component/categories-component';
import { MainMenuComponent } from './component/mainmenu-component/mainmenu-component';
import { MenuComponent } from './component/menu-component/menu-component';
import { ProductSearchComponent } from './component/product-search-component/product-search-component';
import { ProductsComponent } from './component/products-component/products-component';
import { adminGuardsGuard } from './guards/admin-guards-guard';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';
import { ContactComponent } from './component/contact-component/contact-component';

export const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: '', component: MainMenuComponent },
			{
				path: 'menu',
				component: MenuComponent,
				children: [
					{ path: '', component: CategoriesComponent },
					{ path: 'products/:name', component: ProductsComponent },
				],
			},
            {
				path: 'contact',
				component: ContactComponent
			}

		],
	},
	{ path: 'login', component: LoginComponent },
	{
		path: 'admin',
		component: AdminPanelComponent,
		canActivate: [adminGuardsGuard],
		children: [
			{ path: 'product-settings', component: ProductSettings },
			{ path: 'product-add', component: ProductAddComponent },
			{ path: 'category-settings', component: CategorySettingsComponent },
			{ path: 'category-add', component: Categoryaddcomponent },
		],
	},
	{ path: 'productsearch', component: ProductSearchComponent },
	{ path: '**', redirectTo: '' },
];
