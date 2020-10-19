import { PipeTransform, Pipe } from '@angular/core';
import { Course } from 'src/app/models/CourseElements';

@Pipe({ name: 'searchPipeSemester' })

export class SearchPipeSemester implements PipeTransform {
    transform(courses: Course[], searchTerm: string): Course[] {
        if (!courses)
            return [];
        if (!searchTerm)
            return courses;
        const search = searchTerm.toString();
        return courses.filter(course => {
            return course.semestr.toString().includes(search);
        });
    }
}