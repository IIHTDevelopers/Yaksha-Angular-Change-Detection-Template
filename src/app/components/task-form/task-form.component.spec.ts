import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../core/services/task.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { of } from 'rxjs';

class MockTaskService {
  tasks: Task[] = [];

  addTask(task: Task): void {
    this.tasks.push(task);
  }
}

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: MockTaskService;

  beforeEach(() => {
    taskService = new MockTaskService();

    TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [FormsModule],  // Required for [(ngModel)] two-way binding
      providers: [
        { provide: TaskService, useValue: taskService }  // Use the mock service
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should add a new task when the form is submitted', () => {
      // Set the task name and status
      component.taskName = 'Test Task';
      component.status = 'In Progress';

      // Call onSubmit to add the task
      component.onSubmit();

      // Ensure that the task service has added the new task
      expect(taskService.tasks.length).toBe(1);
      expect(taskService.tasks[0].name).toBe('Test Task');
      expect(taskService.tasks[0].status).toBe('In Progress');
      expect(taskService.tasks[0].id).toBeDefined();  // Ensure an ID was assigned

      // Ensure the input field is cleared after submission
      expect(component.taskName).toBe('');
    });

    it('should bind the taskName input field to component property', () => {
      // Find the input element
      const input = fixture.nativeElement.querySelector('#taskName');

      // Set a value to the input
      input.value = 'New Task Name';

      // Trigger input event
      input.dispatchEvent(new Event('input'));

      // Check if the taskName property is updated
      expect(component.taskName).toBe('New Task Name');
    });

    it('should have a default status of "Pending"', () => {
      // Ensure that the default value of status is "Pending"
      expect(component.status).toBe('Pending');
    });

    it('should reset taskName after submitting the form', () => {
      component.taskName = 'Task to be added';
      component.status = 'Completed';

      // Simulate form submission
      component.onSubmit();

      // Check that the taskName is cleared after submission
      expect(component.taskName).toBe('');
    });
  });
});
