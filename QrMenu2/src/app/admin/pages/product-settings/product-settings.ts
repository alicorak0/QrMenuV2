import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/productModel';
import { ProductService } from '../../../services/product-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router'; 
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { UploadPhotoService } from '../../../services/upload-photo-service';
import { ResponseModel } from '../../../models/responseModel';
import { Category } from '../../../models/categoryModel';
import { CategoryService } from '../../../services/category-service';

@Component({
  selector: 'app-product-settings',
  imports: [CommonModule, FormsModule, ReactiveFormsModule  , RouterModule],
  templateUrl: './product-settings.html',
  styleUrl: './product-settings.css',
})
export class ProductSettings implements OnInit {
 products: Product[] = [];          // Bu componentin kendi ürünler listesi
selectedProduct: Product | null = null;
private railTouchStartX = 0;
private railTouchStartY = 0;
private railStartScrollLeft = 0;
private isRailTouchDragging = false;
private isHorizontalRailSwipe = false;

@ViewChild('fileInput') fileInput!: ElementRef;
@ViewChild('productsRail') productsRail?: ElementRef<HTMLDivElement>;


selectedFile: File | null = null; // ürün ekleme 
previewUrl: string | null = null; // ön izleme

allCategories :Category[] =[]; // kategoriler dropdown için




// dosya seçim
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.selectedFile = file;

  // Preview oluştur
  const reader = new FileReader();
  reader.onload = e => this.previewUrl = reader.result as string;
  reader.readAsDataURL(file);
}

productUpdateForm!: FormGroup;        // Reactive form



 ngOnInit(): void {
    this.loadProducts();

    this.loadAllCategories();
      this.createProductAddForm()

  }

constructor(private productService: ProductService,private toastrService: ToastrService,private formBuilder: FormBuilder,
  private uploadPhotoService: UploadPhotoService,private categoryService: CategoryService) {}


selectedCategoryId: number | null = null; // Ürünleri güncellemek için seçilen kategorinin ID'si
filteredCategoryId: number | null = null; // Dropdown'da seçilen kategorinin ID'si

getCategoryName(categoryId: number): string {
  return this.allCategories.find(category => category.categoryId === categoryId)?.categoryName || `Kategori #${categoryId}`;
}

getProductImageUrl(imageName: string | null | undefined): string {
  return imageName
    ? `https://localhost:44311/uploads/products/${imageName}`
    : 'https://localhost:44311/uploads/products/Quattro-logo.png';
}

scrollProducts(direction: 'left' | 'right') {
  const rail = this.productsRail?.nativeElement;

  if (!rail) {
    return;
  }

  const scrollAmount = Math.max(rail.clientWidth * 0.78, 260);

  rail.scrollBy({
    left: direction === 'right' ? scrollAmount : -scrollAmount,
    behavior: 'smooth',
  });
}

onRailTouchStart(event: TouchEvent) {
  const rail = this.productsRail?.nativeElement;
  const touch = event.touches[0];

  if (!rail || !touch) {
    return;
  }

  this.railTouchStartX = touch.clientX;
  this.railTouchStartY = touch.clientY;
  this.railStartScrollLeft = rail.scrollLeft;
  this.isRailTouchDragging = true;
  this.isHorizontalRailSwipe = false;
}

onRailTouchMove(event: TouchEvent) {
  const rail = this.productsRail?.nativeElement;
  const touch = event.touches[0];

  if (!rail || !touch || !this.isRailTouchDragging) {
    return;
  }

  const deltaX = touch.clientX - this.railTouchStartX;
  const deltaY = touch.clientY - this.railTouchStartY;

  if (!this.isHorizontalRailSwipe) {
    if (Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    this.isHorizontalRailSwipe = true;
  }

  if (event.cancelable) {
    event.preventDefault();
  }

  rail.scrollLeft = this.railStartScrollLeft - deltaX;
}

onRailTouchEnd() {
  this.isRailTouchDragging = false;
  this.isHorizontalRailSwipe = false;
}



loadAllCategories()
{

  this.categoryService.getAllCategories().subscribe((response:any)=>{
    this.allCategories = response.data;
  })
}


 createProductAddForm(){

    this.productUpdateForm = this.formBuilder.group({
      productId: ["", Validators.required],
     categoryId:["",Validators.required],
    productName:["",Validators.required],
    description:["",Validators.required],
    tooltip:["",Validators.required],
        price:["",Validators.required],
        isFeatured:[null,Validators.required]



    }) 
    }




loadProducts() { // ürünleri  tabloya bağlama
    this.productService.getAllProducts().subscribe(result => {
      this.products = result.data;  // tabloya burada bağlanır
    });
  }

//  Filtreli  ürünleri getir

getProductsByCategory(categoryId: number) {
  this.productService.getProductsByCategoryId(categoryId)
    .subscribe(res => {
      this.products = res.data;
    });
}





// Filtre seçim eventi
onCategoryChange() {
  if (this.filteredCategoryId == null) {
    this.loadProducts();
  } else {
    this.getProductsByCategory(this.filteredCategoryId);
  }
}






  DeleteProduct(product: Product) {

    if (confirm(`${product.productName} silinsin mi? İşlem Geri Alınamaz !`)) {


      this.productService.deleteProduct(product.productId)
  .subscribe((response: ResponseModel) => {
      this.toastrService.success(`${product.productName} Başarıyla Silindi`);
      this.toastrService.info(response.message);   
      this.cancelSelect(); // reset 
      this.loadProducts();

  });
    }
  }


  SelectProduct(product: Product) {
     this.selectedProduct = product;
console.log(this.selectedCategoryId);

      this.productUpdateForm.patchValue({
        productId: product.productId,
        categoryId: product.categoryId,
        productName: product.productName,
        description: product.description,
        tooltip: product.tooltip,
        price: product.price,
        isFeatured: product.isFeatured
      });
 // Eğer ürünün resmi varsa previewUrl olarak ata
  // Mevcut resim preview
  this.previewUrl = product.image 
      ? "https://localhost:44311/uploads/products/" + product.image
      : null;

  this.selectedFile = null; // input boş kalır
  }

  cancelSelect() {
    this.productUpdateForm.reset();
    this.selectedProduct = null;
    this.previewUrl = null;
    this.selectedFile = null;
   
      this.fileInput.nativeElement.value = ''; // file input sıfırla

  }


updateProduct() {

  if (this.productUpdateForm.invalid) {
    this.toastrService.error("Form geçersiz");
    return;
  }

  const productData = this.productUpdateForm.value;

  // Eğer yeni resim seçildiyse
  if (this.selectedFile) {

    const formData = new FormData();
    formData.append("image", this.selectedFile);

    this.uploadPhotoService.uploadImage(this.selectedFile).subscribe((res: any) => {

      productData.image = res.fileName; // uploaddan gelen isim

      this.productService.updateProduct(productData).subscribe(() => {
        this.toastrService.success("Ürün güncellendi");
        this.loadProducts();
        this.cancelSelect();
      });

    });

  }

  // Yeni resim seçilmediyse
  else {

    productData.image = this.selectedProduct?.image;
                                                         // update kısmı
    this.productService.updateProduct(productData).subscribe(() => {
      this.toastrService.success("Ürün güncellendi");
      this.loadProducts();
      this.cancelSelect();
    });

  }

}

}
