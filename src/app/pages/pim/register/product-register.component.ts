import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { categories, status, typeStock } from 'src/app/constants';
import { IProduct } from 'src/app/interfaces';
import { ProductApiService } from 'src/app/services/pim/api.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css'],
})
export class ProductRegisterComponent {
  formData = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    category: ['', Validators.required],
    sku: ['', Validators.required],
    price: [0, Validators.required],
    stock: [0, Validators.required],
    typeStock: ['', Validators.required],
    status: ['', Validators.required],
    image: ['', Validators.required],
    _id: [''],
  });
  categories = categories;
  status = status;
  typeStocks = typeStock;

  constructor(
    private formBuilder: FormBuilder,
    private productApiService: ProductApiService
  ) {}

  @Output() onCloseModal = new EventEmitter();
  @Output() getAllProducts = new EventEmitter();
  @Input('showModal') showModal = false;
  @Input('productId') productId: Subject<string> = new Subject();

  ngOnInit() {
    this.formData.setValue({
      name: '',
      description: '',
      category: '',
      sku: '',
      price: null,
      stock: null,
      image: '',
      typeStock: '',
      status: '',
      _id: '',
    });
    this.productId.subscribe((productId) => {
      if (productId) {
        this.productApiService
          .getById(productId)
          .subscribe(({ createdAt, ...product }) =>
            this.formData.setValue(product)
          );
      }
    });
  }

  onSubmit() {
    this.formData.value._id ? this.updateProduct() : this.createProduct();
  }

  createProduct() {
    console.log('helloworld', this.formData.value);
    this.productApiService
      .create(this.formData.value as unknown as Omit<IProduct, 'id'>)
      .subscribe(() => {
        this.getAllProducts.emit();
        this.handleCloseModal();
      });
  }

  updateProduct() {
    this.productApiService
      .update(this.formData.value as unknown as IProduct)
      .subscribe(() => {
        this.getAllProducts.emit();
        this.handleCloseModal();
      });
  }

  handleCloseModal() {
    this.formData.setValue({
      name: '',
      description: '',
      category: '',
      sku: '',
      price: null,
      stock: null,
      image: '',
      _id: '',
      status: '',
      typeStock: '',
    });
    this.onCloseModal.emit();
  }
}
