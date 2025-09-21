import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-dropzone',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './dropzone.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropzoneComponent),
      multi: true,
    },
  ],
})
export class DropzoneComponent implements ControlValueAccessor {
  isDragActive = false;
  files: File[] = [];

  previews: string[] = [];


  private onChange: (value: File[]) => void = () => {};
  private onTouched: () => void = () => {};

  // Se llama cuando cambia el valor desde fuera
  writeValue(files: File[]): void {
    this.files = files || [];
  }

  // Se registra la función que Angular usa para cambios
  registerOnChange(fn: (value: File[]) => void): void {
    this.onChange = fn;
  }

  // Se registra la función que Angular usa para marcar como "tocado"
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // opcional: manejar estado disabled
  }

  // -------- eventos internos --------
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    this.files = Array.from(input.files);
    this.generatePreviews(this.files);
    this.onChange(this.files);
    this.onTouched();
  }
}

  @HostListener('drop', ['$event'])
onDrop(event: DragEvent) {
  event.preventDefault();
  this.isDragActive = false;
  if (event.dataTransfer?.files.length) {
    this.files = Array.from(event.dataTransfer.files).filter(file =>
      ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'].includes(file.type)
    );
    this.generatePreviews(this.files);
    this.onChange(this.files);
    this.onTouched();
  }
}


  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = false;
  }

  private generatePreviews(files: File[]) {
  this.previews = [];
  files.forEach(file => {
    const url = URL.createObjectURL(file);
    this.previews.push(url);
  });
}
}
